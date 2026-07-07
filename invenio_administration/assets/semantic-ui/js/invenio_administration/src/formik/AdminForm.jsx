// This file is part of InvenioAdministration
// Copyright (C) 2022 CERN.
// Copyright (C) 2024 KTH Royal Institute of Technology.
// Copyright (C) 2026 Graz University of Technology.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React, { useState, useContext, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Form, Formik } from "formik";
import { Form as SemanticForm, Modal } from "semantic-ui-react";
import { InvenioAdministrationActionsApi } from "../api/actions";
import { Button } from "semantic-ui-react";
import { NotificationContext } from "../ui_messages";
import { ErrorMessage } from "../ui_messages";
import isEmpty from "lodash/isEmpty";
import { GenerateForm } from "./GenerateForm";
import { deserializeFieldErrors } from "../components/utils";
import { i18next } from "@translations/invenio_administration/i18next";
import mapValues from "lodash/mapValues";

export const AdminForm = ({
  resource = undefined,
  resourceSchema,
  apiEndpoint,
  pid = undefined,
  create = false,
  formFields = undefined,
  successCallback = () => {},
}) => {
  const initialFormData = useMemo(() => {
    return resource
      ? resource
      : mapValues(resourceSchema, function (value) {
          const defaultValue = value.metadata?.default;
          if (defaultValue) {
            return defaultValue;
          }
          if (value.type === "bool") {
            return false;
          }
          if (value.type === "object") {
            return null;
          }
          if (value.type === "array") {
            return [];
          }
          return "";
        });
  }, [resource, resourceSchema]);

  const [error, setError] = useState(undefined);
  const [formData] = useState(initialFormData);
  const { addNotification } = useContext(NotificationContext);

  const resetErrorState = useCallback(() => {
    setError(undefined);
  }, []);

  const transformInitialValues = useCallback(
    (formData) => {
      return mapValues(formData, (value, key) => {
        const fieldSchema = resourceSchema[key];
        if (fieldSchema?.metadata?.type === "json" && typeof value === "object") {
          return JSON.stringify(value);
        }
        return value;
      });
    },
    [resourceSchema]
  );

  const onSubmit = useCallback(
    async (values, actions) => {
      let response;

      const transformedValues = mapValues(values, (value, key) => {
        const fieldSchema = resourceSchema[key];

        if (fieldSchema?.metadata?.type === "json") {
          try {
            if (value === "") {
              return null;
            } else if (typeof value === "object") {
              return value;
            } else {
              return JSON.parse(value);
            }
          } catch (e) {
            console.error(`Error parsing JSON for field ${key}:`, e);
            actions.setFieldError(key, i18next.t("Invalid JSON format"));
            throw e;
          }
        }
        return value;
      });

      try {
        if (create) {
          response = await InvenioAdministrationActionsApi.createResource(
            apiEndpoint,
            transformedValues
          );
        } else {
          response = await InvenioAdministrationActionsApi.editResource(
            apiEndpoint,
            pid,
            transformedValues
          );
        }
        actions.setSubmitting(false);
        actions.resetForm({ values: { ...values } });
        addNotification({
          title: i18next.t("Success"),
          content: i18next.t("Your changes were successfully submitted"),
          type: "success",
        });
        successCallback(response.data);
      } catch (e) {
        console.error(e);
        let errorMessage = e.message;

        // API errors need to be deserialised to highlight fields.
        const apiResponse = e?.response?.data;
        if (apiResponse) {
          const apiErrors = apiResponse.errors || [];
          const deserializedErrors = deserializeFieldErrors(apiErrors);
          actions.setErrors(deserializedErrors);
          errorMessage = apiResponse.message || errorMessage;
        }

        setError({
          header: i18next.t("Form error"),
          content: errorMessage,
          id: e.code,
        });
      }
    },
    [resourceSchema, create, apiEndpoint, pid, addNotification, successCallback]
  );

  const transformedFormData = transformInitialValues(formData);

  return (
    <Formik initialValues={transformedFormData} onSubmit={onSubmit}>
      {(props) => {
        return (
          <>
            <Modal.Content>
              <SemanticForm
                id="admin-form"
                as={Form}
                onSubmit={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                }}
              >
                <GenerateForm
                  formFields={formFields}
                  jsonSchema={resourceSchema}
                  create={create}
                  formikProps={props}
                />
                {!isEmpty(error) && (
                  <ErrorMessage {...error} removeNotification={resetErrorState} />
                )}
              </SemanticForm>
            </Modal.Content>

            <Modal.Actions>
              <Button
                form="admin-form"
                type="submit"
                primary
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
              >
                {i18next.t("Save")}
              </Button>
            </Modal.Actions>
          </>
        );
      }}
    </Formik>
  );
};

AdminForm.propTypes = {
  resource: PropTypes.object,
  resourceSchema: PropTypes.object.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  pid: PropTypes.string,
  create: PropTypes.bool,
  formFields: PropTypes.object,
  successCallback: PropTypes.func,
};

AdminForm.defaultProps = {
  resource: undefined,
  create: false,
  pid: undefined,
  formFields: undefined,
  successCallback: () => {},
};
