/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */


import { useCallback } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { AdminForm } from "../formik/AdminForm";

export const CreatePage = ({
  resourceSchema,
  apiEndpoint,
  formFields = undefined,
  listUIEndpoint,
}) => {
  const handleCreate = useCallback(() => {
    window.location.replace(listUIEndpoint);
  }, [listUIEndpoint]);

  return (
    <Grid>
      <Grid.Column width={12}>
        <AdminForm
          resourceSchema={resourceSchema}
          apiEndpoint={apiEndpoint}
          formFields={formFields}
          create
          successCallback={handleCreate}
        />
      </Grid.Column>
    </Grid>
  );
};

CreatePage.propTypes = {
  resourceSchema: PropTypes.object.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  formFields: PropTypes.object,
  listUIEndpoint: PropTypes.string.isRequired,
};
