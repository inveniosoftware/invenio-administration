/*
 * SPDX-FileCopyrightText: 2022-2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import React from "react";
import { Icon } from "semantic-ui-react";
import Overridable from "react-overridable";

class BoolFormatter extends React.Component {
  render() {
    const { value, icon, color, tooltip } = this.props;
    if (!value) {
      return null;
    }
    return <Icon title={tooltip} name={icon} color={color} />;
  }
}

BoolFormatter.propTypes = {
  value: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  tooltip: PropTypes.string.isRequired,
};

BoolFormatter.defaultProps = {
  icon: "check",
  color: "green",
};

export default Overridable.component(
  "InvenioAdministration.BoolFormatter",
  BoolFormatter
);
