/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import _get from "lodash/get";
import React from "react";
import ReactDOM from "react-dom";
import { AdministrationStatistics } from "./AdministrationStatistics";

const domContainer = document.getElementById("statistics-widget-1");
const dataAttr = domContainer.dataset;
const records = dataAttr.records;
const timeInterval = dataAttr.timeInterval;
const label = dataAttr.label;

ReactDOM.render(
  <AdministrationStatistics
    records={records}
    timeInterval={timeInterval}
    label={label}
  />,
  domContainer
);
export default AdministrationStatistics;
