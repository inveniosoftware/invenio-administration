import { LazyForm } from "../LazyForm";
import React from "react";
import {
  Input,
  AutocompleteDropdown,
  BooleanField,
  Dropdown,
  TextArea,
  RichInput,
} from "react-invenio-forms";
import { Field, getIn } from "formik";
import _capitalize from "lodash/capitalize";
import _get from "lodash/get";
import { Form, Segment, Header } from "semantic-ui-react";
import { AdminArrayField } from "./array";
import _isEmpty from "lodash/isEmpty";
import { sortFields } from "../../components/utils";

const fieldsMap = {
  string: Input,
  integer: Input,
  uuid: Input,
  datetime: Input,
  array: AdminArrayField,
  bool: BooleanField,
  function: null,
};

const generateFieldProps = (
  fieldName,
  fieldSchema,
  parentField,
  isCreate,
  formFieldConfig,
  formikProps
) => {
  let currentFieldName;

  const fieldLabel = formFieldConfig?.text || fieldSchema?.title || fieldName;
  const placeholder =
    formFieldConfig?.placeholder || fieldSchema?.metadata?.placeholder;

  if (parentField) {
    currentFieldName = `${parentField}.${fieldName}`;
  } else {
    currentFieldName = fieldName;
  }

  const htmlDescription = (
    <>
      <p />
      <div
        dangerouslySetInnerHTML={{
          __html: formFieldConfig?.description || fieldSchema?.metadata?.description,
        }}
      />
    </>
  );

  let dropdownOptions;
  dropdownOptions = formFieldConfig?.options || fieldSchema?.metadata?.options;

  if (!dropdownOptions && fieldSchema.enum) {
    dropdownOptions = fieldSchema.enum.map((value) => ({
      title_l10n: value,
      id: value,
    }));
  }

  return {
    fieldPath: currentFieldName,
    key: currentFieldName,
    label: _capitalize(fieldLabel),
    description: htmlDescription,
    required: fieldSchema.required,
    disabled: fieldSchema.readOnly || (fieldSchema.createOnly && !isCreate),
    placeholder,
    options: dropdownOptions,
    rows: formFieldConfig?.rows || fieldSchema?.metadata?.rows,
    value: formFieldConfig.dump_default,
  };
};

export const mapFormFields = (
  obj,
  parentField,
  isCreate,
  formFieldsConfig,
  dropDumpOnly,
  formikProps,
  formData
) => {
  if (_isEmpty(obj)) {
    return <></>;
  }
  const sortedFields = sortFields(formFieldsConfig);
  const elements = Object.entries(sortedFields).map(([fieldName]) => {
    const fieldSchema = _get(obj, fieldName);
    if (fieldSchema.readOnly && dropDumpOnly) {
      return null;
    }

    const fieldProps = generateFieldProps(
      fieldName,
      fieldSchema,
      parentField,
      isCreate,
      formFieldsConfig[fieldName]
    );
    const isHidden = fieldSchema.metadata?.type === "hidden";
    const showField =
      _isEmpty(formFieldsConfig) ||
      Object.prototype.hasOwnProperty.call(formFieldsConfig, fieldProps.fieldPath) ||
      Object.prototype.hasOwnProperty.call(
        formFieldsConfig,
        fieldProps.fieldPath.replace(`${parentField}.`, "")
      );

    if (!showField) {
      return null;
    }
    if (isHidden) {
      return (
        <Field
          type="hidden"
          key={fieldProps.fieldPath}
          value={fieldProps.value}
          name={fieldProps.fieldPath}
        />
      );
    }

    if (fieldSchema.type === "array") {
      return (
        <AdminArrayField
          key={fieldProps.fieldPath}
          fieldSchema={fieldSchema}
          isCreate={isCreate}
          mapFormFields={mapFormFields}
          formFields={formFieldsConfig}
          {...fieldProps}
        />
      );
    }

    if (fieldSchema.type === "bool") {
      const description = fieldProps.description;

      return (
        <>
          <BooleanField
            key={fieldProps.fieldPath}
            required={fieldSchema.required}
            value={fieldSchema.metadata.checked === "true"}
            {...fieldProps}
          />
          {description && <label className="helptext">{description}</label>}
        </>
      );
    }

    if (fieldSchema.type === "vocabulary") {
      return (
        <AutocompleteDropdown
          key={fieldProps.fieldPath}
          required={fieldSchema.required}
          autocompleteFrom={`/api/vocabularies/${fieldSchema.metadata.type}`}
          {...fieldProps}
        />
      );
    }

    if (fieldSchema.type === "object" && fieldSchema.metadata?.type === "dynamic") {
      return (
        <React.Fragment key={fieldProps.fieldPath}>
          <Header attached="top" as="h5">
            {fieldProps.label}
          </Header>
          <Segment attached="bottom">
            <Form.Group grouped>
              <LazyForm
                {...fieldProps}
                formikProps={formikProps}
                fieldSchema={fieldSchema}
                key={fieldProps.fieldPath}
                formData={formData}
              />
            </Form.Group>
          </Segment>
        </React.Fragment>
      );
    }

    if (fieldSchema.type === "object") {
      // nested fields
      return (
        <React.Fragment key={fieldProps.fieldPath}>
          <Header attached="top" as="h5">
            {fieldProps.label}
          </Header>
          <Segment attached="bottom">
            <Form.Group grouped>
              {mapFormFields(
                fieldSchema.properties,
                fieldProps.fieldPath,
                isCreate,
                formFieldsConfig
              )}
            </Form.Group>
          </Segment>
        </React.Fragment>
      );
    }

    if (fieldSchema.type === "string" && fieldProps.options) {
      return (
        <Dropdown
          key={fieldProps.fieldPath}
          required={fieldSchema.required}
          options={fieldProps.options}
          {...fieldProps}
        />
      );
    }

    const rows = formFieldsConfig[fieldName]?.rows || fieldSchema?.metadata?.rows;
    if ((fieldSchema.type === "string" && rows) || fieldSchema.type === "dict") {
      return (
        <TextArea
          key={fieldProps.fieldPath}
          fieldPath={fieldProps.fieldPath}
          rows={rows}
          {...fieldProps}
        />
      );
    }

    if (fieldSchema.type === "html") {
      return (
        <RichInput
          key={fieldProps.fieldPath}
          fieldPath={fieldProps.fieldPath}
          {...fieldProps}
        />
      );
    }

    const Element = fieldsMap[fieldSchema.type];
    return (
      <Element {...fieldProps} key={fieldProps.fieldPath} value={fieldProps.value} />
    );
  });

  return elements;
};
