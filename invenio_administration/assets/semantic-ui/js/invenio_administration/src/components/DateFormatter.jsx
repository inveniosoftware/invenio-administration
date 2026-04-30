/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import { DateTime } from "luxon";
import PropTypes from "prop-types";

const DateFormatter = ({ value }) => {
  if (!value) {
    return null;
  }

  const date = DateTime.fromISO(value);
  return (
    <p data-testid="date-formatter">{date.toLocaleString(DateTime.DATETIME_MED)}</p>
  );
};

DateFormatter.propTypes = {
  value: PropTypes.string.isRequired,
};

export default DateFormatter;
