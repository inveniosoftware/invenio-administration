/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-FileCopyrightText: 2026 KTH Royal Institute of Technology.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import _get from "lodash/get";
import Overridable from "react-overridable";
import { Table } from "semantic-ui-react";
import Formatter from "../components/Formatter";

class DetailsTable extends Component {
  render() {
    const { schema, data, uiSchema } = this.props;

    let fields = uiSchema ? uiSchema : schema;

    const tableRows = Object.entries(fields).map(([field, fieldSchema]) => {
      const text = fieldSchema.text || field;
      const formattedValue = (
        <Formatter
          result={data}
          resourceSchema={schema}
          property={field}
          fieldSchema={fieldSchema}
        />
      );
      const link = fieldSchema.link ? _get(data, fieldSchema.link) : undefined;
      const value = link ? <a href={link}>{formattedValue}</a> : formattedValue;

      return (
        <Table.Row key={text}>
          <Table.Cell width={3} className="vertical-align-top">
            <b>{text}</b>
          </Table.Cell>
          <Table.Cell>{value}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Overridable id="DetailsComponent.table">
        <Table unstackable>
          <Table.Body>{tableRows}</Table.Body>
        </Table>
      </Overridable>
    );
  }
}

DetailsTable.propTypes = {
  data: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
};

export default Overridable.component("DetailsTable", DetailsTable);
