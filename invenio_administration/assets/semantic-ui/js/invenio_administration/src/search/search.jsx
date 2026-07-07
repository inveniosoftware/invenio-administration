/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import { createSearchAppInit } from "@js/invenio_search_ui";
import { SearchBulkActionContext } from "./SearchBulkActionContext";
import { initDefaultSearchComponents } from "./SearchComponents";

const domContainer = document.getElementById("invenio-search-config");

const defaultComponents = initDefaultSearchComponents(domContainer);

createSearchAppInit(
  defaultComponents,
  true,
  "invenio-search-config",
  false,
  SearchBulkActionContext
);
