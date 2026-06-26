/*
 * SPDX-FileCopyrightText: 2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import { InvenioAdministrationActionsApi } from "@js/invenio_administration/src/api";
import { GenerateForm } from "@js/invenio_administration/src/formik/GenerateForm";
import isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { getIn } from "formik";

export class LazyForm extends Component {
  constructor(props) {
    super(props);
    const { fieldSchema } = props;
    this.state = {
      lazySchema: {},
      fieldSchema: fieldSchema,
    };
  }

  hasExistingValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  };

  handleFieldValueChange = async (value, preserveExistingValues = false) => {
    const { fieldSchema } = this.state;
    const { formikProps, fieldPath } = this.props;
    const { endpoint } = fieldSchema.metadata;

    try {
      const response = await InvenioAdministrationActionsApi.getSchema(endpoint, value);
      fieldSchema["properties"] = response.data;
      this.setState({ lazySchema: response.data, fieldSchema: { ...fieldSchema } });

      for (const [key, schema] of Object.entries(response.data)) {
        const nestedFieldPath = `${fieldPath}.${key}`;
        const currentValue = getIn(formikProps.values, nestedFieldPath);

        if (preserveExistingValues && this.hasExistingValue(currentValue)) {
          continue;
        }

        formikProps.setFieldValue(nestedFieldPath, schema.load_default);
      }
    } catch (e) {
      console.error(e);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { formikProps } = this.props;
    const { fieldSchema } = this.state;
    const { depends_on: dependsOnField } = fieldSchema.metadata;
    const previousValue = getIn(prevProps.formikProps.values, dependsOnField, "");
    const choiceValue = getIn(formikProps.values, dependsOnField, "");
    if (previousValue !== choiceValue) {
      this.handleFieldValueChange(choiceValue);
    }
  }

  componentDidMount() {
    const { formikProps, fieldSchema } = this.props;
    const { depends_on: dependsOnField } = fieldSchema.metadata;
    const choiceValue = getIn(formikProps.values, dependsOnField, "");
    if (!isEmpty(choiceValue)) {
      this.handleFieldValueChange(choiceValue, true);
    }
  }

  render() {
    const { formikProps, fieldPath } = this.props;
    const { lazySchema } = this.state;
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
  }
}

LazyForm.propTypes = {
  formikProps: PropTypes.object.isRequired,
  fieldSchema: PropTypes.object.isRequired,
  fieldPath: PropTypes.string.isRequired,
};
