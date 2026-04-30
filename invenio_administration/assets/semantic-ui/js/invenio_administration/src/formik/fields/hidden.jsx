import { generateFieldProps } from "./props_generator";

export const generateHiddenFieldProps = (
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
  return { ...fieldProps, type: "hidden", name: fieldProps.name };
};
