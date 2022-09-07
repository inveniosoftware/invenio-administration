/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */
import PropTypes from "prop-types";
import React, { Component } from "react";
import _get from "lodash/get";
import { Table } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";
import { Actions } from "../actions/Actions";
import { withState } from "react-searchkit";
import { AdminUIRoutes } from "../routes";

class SearchResultItemComponent extends Component {
  refreshAfterAction = () => {
    const { updateQueryState, currentQueryState } = this.props;
    updateQueryState(currentQueryState);
  };

  render() {
    const {
      result,
      columns,
      displayEdit,
      displayDelete,
      actions,
      apiEndpoint,
      idKeyPath,
      listUIEndpoint,
    } = this.props;

    const resourceHasActions =
      displayEdit || displayDelete || !isEmpty(actions);

    return (
      <Table.Row>
        {columns.map(([property, { text, order }], index) => {
          return (
            <Table.Cell key={`${text}-${order}`} data-label={text}>
              {index === 0 && (
                <a
                  href={AdminUIRoutes.detailsView(
                    listUIEndpoint,
                    result,
                    idKeyPath
                  )}
                >
                  {_get(result, property)}
                </a>
              )}
              {index !== 0 && _get(result, property)}
            </Table.Cell>
          );
        })}
        {resourceHasActions && (
          <Table.Cell>
            <Actions
              apiEndpoint={apiEndpoint}
              displayEdit={displayEdit}
              displayDelete={displayDelete}
              actions={actions}
              resource={result}
              idKeyPath={idKeyPath}
              successCallback={this.refreshAfterAction}
              listUIEndpoint={listUIEndpoint}
            />
          </Table.Cell>
        )}
      </Table.Row>
    );
  }
}

SearchResultItemComponent.propTypes = {
  result: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  displayDelete: PropTypes.bool,
  displayEdit: PropTypes.bool,
  actions: PropTypes.object,
  apiEndpoint: PropTypes.string,
  updateQueryState: PropTypes.func.isRequired,
  currentQueryState: PropTypes.object.isRequired,
  idKeyPath: PropTypes.string.isRequired,
  listUIEndpoint: PropTypes.string.isRequired,
};

SearchResultItemComponent.defaultProps = {
  displayDelete: true,
  displayEdit: true,
  apiEndpoint: undefined,
  actions: {},
};

export const SearchResultItem = withState(SearchResultItemComponent);
