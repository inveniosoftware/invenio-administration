/*
 * SPDX-FileCopyrightText: 2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import { generateFieldProps } from "./props_generator";
import PropTypes from "prop-types";
import { Form, Segment, Header } from "semantic-ui-react";

export const generateObjectFieldProps = (
  fieldName,
  fieldSchema,
  parentField,
  isCreate,
  formFieldConfig,
  formikProps,
  formFieldsConfig,
  formData,
  mapFormFields
) => {
  const fieldProps = generateFieldProps(
    fieldName,
    fieldSchema,
    parentField,
    isCreate,
    formFieldConfig,
    formikProps
  );
  const objectFieldProps = {
    mapFormFields: mapFormFields,
    fieldSchema: fieldSchema,
  };
  return { ...fieldProps, ...objectFieldProps };
};

export const ObjectField = ({
  mapFormFields,
  fieldSchema,
  isCreate = false,
  formFieldsConfig,
  ...fieldProps
}) => {
  fieldProps = {
    ...fieldProps,
    isCreate: typeof fieldProps.isCreate === "undefined" ? false : fieldProps.isCreate
  };

  return (
    <>
      <Header attached="top" as="h5">
        {fieldProps.label}
      </Header>
      <Segment attached="bottom">
        <Form.Group grouped>
          {mapFormFields(
            fieldSchema.properties,
            fieldProps.name,
            isCreate,
            formFieldsConfig
          )}
        </Form.Group>
      </Segment>
    </>
  );
};

ObjectField.propTypes = {
  fieldProps: PropTypes.object.isRequired,
  fieldSchema: PropTypes.object.isRequired,
  formFieldsConfig: PropTypes.object.isRequired,
  isCreate: PropTypes.bool,
  mapFormFields: PropTypes.func.isRequired,
};

