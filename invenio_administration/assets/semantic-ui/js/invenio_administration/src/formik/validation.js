import * as Yup from "yup";
import mapValues from "lodash/mapValues";

const toYupSchema = (fieldSchema) => {
  switch (fieldSchema.type) {
    case "number":
      return Yup.number();
    case "string":
      return Yup.string();
    case "bool":
      return Yup.bool();
    case "array":
      return Yup.array();
    case "object":
      return Yup.object({});
    case "html":
      return Yup.string();
    default:
      return Yup.mixed();
  }
};

const mapValidationRules = (yupSchema, fieldSchema) => {
  let validationSchema = yupSchema;

  if (fieldSchema.required) {
    validationSchema = validationSchema.required();
  }

  return validationSchema;
};

const generateValidationSchema = (resourceSchema) => {
  if (Object.keys(resourceSchema).length === 0) {
    return;
  }

  const yupFieldsSchema = mapValues(resourceSchema, (fieldSchema) => {
    const yupSchema = toYupSchema(fieldSchema);
    return mapValidationRules(yupSchema, fieldSchema);
  });

  return Yup.object({ ...yupFieldsSchema });
};

export { generateValidationSchema };
