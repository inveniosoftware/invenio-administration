// This file is part of InvenioAdministration
// Copyright (C) 2022 CERN.
// Copyright (C) 2025 KTH Royal Institute of Technology.
//
// Invenio is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import Edit from "./Edit";
import Delete from "./Delete";
import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import ResourceActions from "./ResourceActions";
import { Dropdown } from "semantic-ui-react";
import { i18next } from "@translations/invenio_administration/i18next";

export class Actions extends Component {
  render() {
    const {
      title,
      resourceName,
      actions,
      resource,
      successCallback,
      idKeyPath,
      editUrl,
      displayEdit,
      displayDelete,
      displayAsDropdown,
    } = this.props;

    // if number of actions is greater than 3, we display all in a dropdown
    const _displayAsDropdown =
      displayAsDropdown ||
      (displayEdit && displayDelete && Object.keys(actions).length > 1);

    if (_displayAsDropdown) {
      return (
        <>
          <Dropdown
            button
            icon="cog"
            size="tiny"
            direction="left"
            className="icon rel-ml-1 light"
            aria-label={i18next.t("Open list of actions")}
          >
            {!isEmpty(actions) && (
              <Dropdown.Menu>
                <ResourceActions
                  resource={resource}
                  successCallback={successCallback}
                  idKeyPath={idKeyPath}
                  actions={actions}
                  Element={Dropdown.Item}
                />
              </Dropdown.Menu>
            )}
          </Dropdown>
          {displayEdit && <Edit editUrl={editUrl} resource={resource} />}
          {displayDelete && (
            <Delete
              successCallback={successCallback}
              resource={resource}
              resourceName={resourceName}
              title={title}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          {!isEmpty(actions) && (
            <ResourceActions
              resource={resource}
              successCallback={successCallback}
              idKeyPath={idKeyPath}
              actions={actions}
            />
          )}
          {displayEdit && <Edit editUrl={editUrl} resource={resource} />}
          {displayDelete && (
            <Delete
              successCallback={successCallback}
              resource={resource}
              resourceName={resourceName}
              title={title}
            />
          )}
        </>
      );
    }
  }
}

Actions.propTypes = {
  title: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  displayEdit: PropTypes.bool,
  displayDelete: PropTypes.bool,
  displayAsDropdown: PropTypes.bool,
  resource: PropTypes.object.isRequired,
  successCallback: PropTypes.func.isRequired,
  idKeyPath: PropTypes.string,
  actions: PropTypes.object.isRequired,
  editUrl: PropTypes.string.isRequired,
};

Actions.defaultProps = {
  displayEdit: true,
  displayDelete: true,
  displayAsDropdown: false,
  idKeyPath: "pid",
};
