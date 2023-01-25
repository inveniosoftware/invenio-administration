/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import PropTypes from "prop-types";
import React from "react";
import { Icon } from "semantic-ui-react";
import Overridable from "react-overridable";
import { buildUID } from "react-searchkit";

export default class BoolFormatter extends React.Component {
  render() {
    const { value, icon, color, appName } = this.props;
    return (
      <Overridable
        id={buildUID("BoolFormater.layout", "", appName)}
        icon={icon}
        color={color}
        value={value}
        appName={appName}
      >
        {!value ? null : <Icon name={icon} color={color} />}
      </Overridable>
    );
  }
}

BoolFormatter.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  appName: PropTypes.string,
};

BoolFormatter.defaultProps = {
  icon: "check",
  color: "green",
  appName: "",
};
