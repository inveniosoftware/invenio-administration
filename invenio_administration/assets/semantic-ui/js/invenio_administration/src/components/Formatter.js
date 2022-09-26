/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */
import React from "react";
import PropTypes from "prop-types";
import _get from "lodash/get";
import { DateFormatter } from ".";
import Overridable from "react-overridable";

const elementTypeMap = {
  datetime: DateFormatter,
  date: DateFormatter,
};

class Formatter extends React.Component {
  render() {
    const { resourceSchema, result, property } = this.props;

    const resourceSchemaProperty = property.replace(/\./g, ".properties.");
    const typePath = `${resourceSchemaProperty}.type`;

    const type = _get(resourceSchema, typePath);
    const Element = _get(elementTypeMap, type);
    const value = _get(result, property, null);
    return (
      <Overridable id="Formatter.layout">
        <>
          {Element ? <Element value={value} /> : value}
          {
            // eslint-disable-line react/jsx-no-useless-fragment
          }
        </>
      </Overridable>
    );
  }
}

Formatter.propTypes = {
  resourceSchema: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  property: PropTypes.string.isRequired,
};

export default Overridable.component("Formatter", Formatter);
