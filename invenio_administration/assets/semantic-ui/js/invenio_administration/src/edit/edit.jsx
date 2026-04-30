/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { EditPage } from "./EditPage";
import _get from "lodash/get";
import { NotificationController } from "../ui_messages/context";

const domContainer = document.getElementById("invenio-administration-edit-root");
const resourceSchema = JSON.parse(domContainer.dataset.resourceSchema);
const apiEndpoint = _get(domContainer.dataset, "apiEndpoint");
const pid = JSON.parse(domContainer.dataset.pid);
const formFields = JSON.parse(domContainer.dataset.formFields);
const listUIEndpoint = domContainer.dataset.listEndpoint;

const root = createRoot(domContainer);
root.render(
  <NotificationController>
    <EditPage
      resourceSchema={resourceSchema}
      apiEndpoint={apiEndpoint}
      formFields={formFields}
      pid={pid}
      listUIEndpoint={listUIEndpoint}
    />
  </NotificationController>
);
