/*
 * SPDX-FileCopyrightText: 2022-2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import Overridable from "react-overridable";

const BoolFormatter = ({ value, icon = "check", color = "green", tooltip }) => {
  if (!value) {
    return null;
  }
  return <Icon title={tooltip} name={icon} color={color} />;
};

BoolFormatter.propTypes = {
  value: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  tooltip: PropTypes.string.isRequired,
};

export default Overridable.component(
  "InvenioAdministration.BoolFormatter",
  BoolFormatter
);
