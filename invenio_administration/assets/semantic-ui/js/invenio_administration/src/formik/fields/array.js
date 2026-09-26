/*
 * SPDX-FileCopyrightText: 2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import { mapFormFields } from "./fields";
import { generateFieldProps } from "./props_generator";
import React from "react";
import { Array, Input } from "react-invenio-forms";
import { Form, Button, Icon } from "semantic-ui-react";
import { i18next } from "@translations/invenio_administration/i18next";
import PropTypes from "prop-types";

export const generateArrayFieldProps = (
  fieldName,
  fieldSchema,
  parentField,
  isCreate,
  formFieldConfig,
  formikProps,
  formFieldsConfig
) => {
  const fieldProps = generateFieldProps(
    fieldName,
    fieldSchema,
    parentField,
    isCreate,
    formFieldConfig,
    formikProps
  );
  const arrayFieldProps = {
    fieldSchema: fieldSchema,
    isCreate: isCreate,
    mapFormFields: mapFormFields,
    formFields: formFieldsConfig,
  };
  return { ...fieldProps, ...arrayFieldProps };
};

const createEmptyArrayRowObject = (schema) => {
  if (schema.type === "object" || schema.type === "vocabulary") {
    const emptyRow = {};
    for (let [key, childSchema] of Object.entries(schema.properties || {})) {
      emptyRow[key] = createEmptyArrayRowObject(childSchema);
    }
    return emptyRow;
  } else if (schema.type === "array") {
    return [createEmptyArrayRowObject(schema.items)];
  } else {
    return "";
  }
};

export const AdminArrayField = ({
  fieldSchema,
  mapFormFields,
  isCreate,
  formFields,
  ...fieldProps
}) => {
  const newRow = createEmptyArrayRowObject(fieldSchema.items);
  return (
    <Array
      defaultNewValue={newRow}
      className="array-widget"
      addButtonLabel={i18next.t("Add")}
      {...fieldProps}
    >
      {({ arrayHelpers, indexPath }) => {
        const fieldPathPrefix = `${fieldProps.name}.${indexPath}`;
        return (
          <Form.Group grouped widths="equal" className="group">
            {fieldSchema.items.properties ? (
              mapFormFields(
                fieldSchema.items.properties,
                fieldPathPrefix,
                isCreate,
                formFields
              )
            ) : (
              <Input
                fieldPath={fieldPathPrefix}
                fluid
              />
            )}
            <Form.Field>
              <Button
                aria-label={i18next.t("Remove field")}
                className="close-btn"
                icon
                onClick={() => arrayHelpers.remove(indexPath)}
              >
                <Icon name="close" />
              </Button>
            </Form.Field>
          </Form.Group>
        );
      }}
    </Array>
  );
};

AdminArrayField.propTypes = {
  fieldSchema: PropTypes.object.isRequired,
  mapFormFields: PropTypes.func.isRequired,
  isCreate: PropTypes.bool,
  formFields: PropTypes.object,
};

AdminArrayField.defaultProps = {
  isCreate: false,
  formFields: undefined,
};
