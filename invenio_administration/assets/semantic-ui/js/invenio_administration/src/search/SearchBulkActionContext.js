/*
 * SPDX-FileCopyrightText: 2023 CERN.
 * SPDX-License-Identifier: MIT
 */

import { NotificationController } from "../ui_messages";
import { SearchResultsBulkActionsManager } from "react-invenio-forms";
import PropTypes from "prop-types";

export const SearchBulkActionContext = ({ children }) => {
  return (
    <NotificationController>
      <SearchResultsBulkActionsManager>{children}</SearchResultsBulkActionsManager>
    </NotificationController>
  );
};

SearchBulkActionContext.propTypes = {
  children: PropTypes.node.isRequired,
};

