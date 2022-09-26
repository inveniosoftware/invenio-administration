/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { Component } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { withState } from "react-searchkit";
import { i18next } from "@translations/invenio_administration/i18next";
import PropTypes from "prop-types";
import Overridable from "react-overridable";

class SearchEmptyResultsComponent extends Component {
  render() {
    const {
      resetQuery,
      extraContent,
      queryString,
      currentQueryState,
      currentResultsState,
    } = this.props;

    const isEmptyPageAfterSearch = currentQueryState.page < 0;
    const isEmptyPage =
      currentQueryState.page === 1 && currentResultsState.data.total === 0;

    return (
      <Overridable id="SearchEmptyResults.layout">
        <Segment placeholder textAlign="center">
          <Header icon>
            <Icon name="search" />
            {isEmptyPage && i18next.t("There is no resources in this category.")}
            {isEmptyPageAfterSearch && i18next.t("No matching resources found.")}
          </Header>

          {queryString && (
            <em>
              {" "}
              {i18next.t(`Current search "{{queryString}}"`, {
                queryString: queryString,
              })}{" "}
            </em>
          )}
          <br />
          {isEmptyPageAfterSearch && (
            <Button primary onClick={() => resetQuery()}>
              {i18next.t("Clear query")}
            </Button>
          )}
          {extraContent}
        </Segment>
      </Overridable>
    );
  }
}

SearchEmptyResultsComponent.propTypes = {
  resetQuery: PropTypes.func.isRequired,
  extraContent: PropTypes.node,
  queryString: PropTypes.string,
  currentQueryState: PropTypes.object.isRequired,
  currentResultsState: PropTypes.object.isRequired,
};

SearchEmptyResultsComponent.defaultProps = {
  extraContent: undefined,
  queryString: undefined,
};

const SearchEmptyResults = withState(SearchEmptyResultsComponent);
export default Overridable.component("SearchEmptyResults", SearchEmptyResults);
