import { InvenioAdministrationActionsApi } from "@js/invenio_administration/src/api";
import { GenerateForm } from "@js/invenio_administration/src/formik/GenerateForm";
import isEmpty from "lodash/isEmpty";
import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { getIn } from "formik";

export const LazyForm = ({ formikProps, fieldSchema: initialFieldSchema, fieldPath, formData }) => {
  const [lazySchema, setLazySchema] = useState({});
  const [fieldSchema, setFieldSchema] = useState(initialFieldSchema);
  const prevDependsOnValueRef = useRef(undefined);

  const handleFieldValueChange = useCallback(
    async (value) => {
      const { endpoint } = fieldSchema.metadata;
      try {
        const response = await InvenioAdministrationActionsApi.getSchema(endpoint, value);
        const updatedFieldSchema = { ...fieldSchema, properties: response.data };
        setLazySchema(response.data);
        setFieldSchema(updatedFieldSchema);
        for (const [key, val] of Object.entries(response.data)) {
          formikProps.setFieldValue(`${fieldPath}.${key}`, val.load_default);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [fieldSchema, fieldPath, formikProps]
  );

  const { depends_on: dependsOnField } = fieldSchema.metadata;

  useEffect(() => {
    const choiceValue = getIn(formikProps.values, dependsOnField, "");
    if (!isEmpty(choiceValue)) {
      handleFieldValueChange(choiceValue);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const choiceValue = getIn(formikProps.values, dependsOnField, "");
    const previousValue = prevDependsOnValueRef.current;
    if (previousValue !== undefined && previousValue !== choiceValue) {
      handleFieldValueChange(choiceValue);
    }
    prevDependsOnValueRef.current = choiceValue;
  }, [formikProps.values, dependsOnField, handleFieldValueChange]);

  if (isEmpty(lazySchema)) {
    return null;
  }

  return (
    <GenerateForm
      jsonSchema={lazySchema}
      formFields={lazySchema}
      parentField={fieldPath}
      formikProps={formikProps}
      create
      dropDumpOnly
    />
  );
};

LazyForm.propTypes = {
  formikProps: PropTypes.object.isRequired,
  fieldSchema: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
  formData: PropTypes.object,
};
