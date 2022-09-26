// This file is part of InvenioAdministration
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { AdminForm } from "../formik";
import Overridable from "react-overridable";

class CreatePage extends Component {
  handleCreate = () => {
    const { listUIEndpoint } = this.props;
    window.location.replace(listUIEndpoint);
  };

  render() {
    const { resourceSchema, apiEndpoint, formFields } = this.props;

    return (
      <Overridable id="CreatePage.layout" handleCreate={this.handleCreate}>
        <Grid>
          <Grid.Column width={12}>
            <AdminForm
              resourceSchema={resourceSchema}
              apiEndpoint={apiEndpoint}
              formFields={formFields}
              create
              successCallback={this.handleCreate}
            />
          </Grid.Column>
        </Grid>
      </Overridable>
    );
  }
}

CreatePage.propTypes = {
  resourceSchema: PropTypes.object.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  formFields: PropTypes.object,
  listUIEndpoint: PropTypes.string.isRequired,
};

CreatePage.defaultProps = {
  formFields: undefined,
};

export default Overridable.component("CreatePage", CreatePage);
