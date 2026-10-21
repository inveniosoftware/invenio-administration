/*
 * SPDX-FileCopyrightText: 2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import { generateFieldProps } from "./props_generator";
import PropTypes from "prop-types";
import { BooleanField } from "react-invenio-forms";

export const generateBoolFieldProps = (
  fieldName,
  fieldSchema,
  parentField,
  isCreate,
  formFieldConfig,
  formikProps,
  formFieldsConfig,
  formData
) => {
  const fieldProps = generateFieldProps(
    fieldName,
    fieldSchema,
    parentField,
    isCreate,
    formFieldConfig,
    formikProps
  );
  const boolFieldProps = {
    fieldSchema: fieldSchema,
  };
  return { ...fieldProps, ...boolFieldProps };
};

export const AdminBoolField = ({ fieldSchema, ...fieldProps }) => {
  const description = fieldProps.description;

  return (
    <>
      <BooleanField
        key={fieldProps.name}
        required={fieldSchema.required}
        value={fieldSchema.metadata.checked === "true"}
        {...fieldProps}
      />
      {description && <label className="helptext">{description}</label>}
    </>
  );
};

AdminBoolField.propTypes = {
  fieldProps: PropTypes.object.isRequired,
  fieldSchema: PropTypes.object.isRequired,
};
