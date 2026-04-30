/*
 * This file is part of Invenio.
 * Copyright (C) 2022-2024 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
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

BoolFormatter.defaultProps = {
  icon: "check",
  color: "green",
};

export default Overridable.component(
  "InvenioAdministration.BoolFormatter",
  BoolFormatter
);
