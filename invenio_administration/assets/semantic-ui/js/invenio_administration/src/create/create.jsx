// This file is part of InvenioAdministration
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { createRoot } from "react-dom/client";
import { CreatePage } from "./CreatePage";
import _get from "lodash/get";
import { NotificationController } from "../ui_messages/context";

const domContainer = document.getElementById("invenio-administration-create-root");
const resourceSchema = JSON.parse(domContainer.dataset.resourceSchema);
const apiEndpoint = _get(domContainer.dataset, "apiEndpoint");
const formFields = JSON.parse(domContainer.dataset.formFields);
const listUIEndpoint = domContainer.dataset.listEndpoint;

const root = createRoot(domContainer);
root.render(
  <NotificationController>
    <CreatePage
      resourceSchema={resourceSchema}
      apiEndpoint={apiEndpoint}
      formFields={formFields}
      listUIEndpoint={listUIEndpoint}
    />
  </NotificationController>
);
