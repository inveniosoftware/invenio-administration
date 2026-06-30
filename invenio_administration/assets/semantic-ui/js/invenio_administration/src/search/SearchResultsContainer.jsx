/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import React from "react";
import { Table } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";
import { i18next } from "@translations/invenio_administration/i18next";

export const SearchResultsContainer = ({
  results,
  columns,
  displayEdit = true,
  displayDelete = true,
  actions,
}) => {
  const resourceHasActions = displayEdit || displayDelete || !isEmpty(actions);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {columns.map(([property, { text, order, width }], index) => {
            if (!width) {
              width = index === 0 ? undefined : index === 1 ? 4 : 3;
            }

            return (
              <Table.HeaderCell key={property + order} width={width}>
                {text}
              </Table.HeaderCell>
            );
          })}
          {resourceHasActions && (
            <Table.HeaderCell collapsing>{i18next.t("Actions")}</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>{results}</Table.Body>
    </Table>
  );
};

SearchResultsContainer.propTypes = {
  results: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  displayEdit: PropTypes.bool,
  displayDelete: PropTypes.bool,
  actions: PropTypes.object.isRequired,
};

SearchResultsContainer.defaultProps = {
  displayDelete: true,
  displayEdit: true,
};
