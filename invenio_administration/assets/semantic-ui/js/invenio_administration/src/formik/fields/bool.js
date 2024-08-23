import React, { Component } from "react";
import PropTypes from "prop-types";
import { BooleanField } from "react-invenio-forms";

export class AdminBoolField extends Component {
  render() {
    const { fieldSchema, ...fieldProps } = this.props;
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
}

AdminBoolField.propTypes = {
  fieldProps: PropTypes.object.isRequired,
  fieldSchema: PropTypes.object.isRequired,
};
