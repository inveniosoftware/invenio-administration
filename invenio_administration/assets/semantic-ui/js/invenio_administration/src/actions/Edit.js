import PropTypes from "prop-types";
import React, { Component } from "react";
import { i18next } from "@translations/invenio_administration/i18next";
import { Button, Popup, Icon } from "semantic-ui-react";
import Overridable from "react-overridable";
import { buildUID } from "react-searchkit";

export default class EditCmp extends Component {
  render() {
    const { display, editUrl, disable, disabledMessage, resource, appName } =
      this.props;
    if (!display) {
      return null;
    }
    const disabled = disable(resource);

    return (
      <Overridable
        id={buildUID("EditAction.layout", "", appName)}
        display={display}
        editUrl={editUrl}
        disabled={disabled}
        disabledMessage={disabledMessage}
        resource={resource}
        appName={appName}
      >
        <Popup
          content={disabledMessage}
          disabled={!disabled}
          trigger={
            <span className="mr-5">
              <Button
                as="a"
                disabled={disabled}
                href={editUrl}
                icon
                labelPosition="left"
              >
                <Icon name="pencil" />
                {i18next.t("Edit")}
              </Button>
            </span>
          }
        />
      </Overridable>
    );
  }
}

EditCmp.propTypes = {
  display: PropTypes.bool,
  editUrl: PropTypes.string.isRequired,
  disable: PropTypes.func,
  disabledMessage: PropTypes.string,
  resource: PropTypes.object,
  appName: PropTypes.string,
};

EditCmp.defaultProps = {
  display: true,
  disable: () => false,
  disabledMessage: i18next.t("Resource is not editable."),
  resource: undefined,
  appName: "",
};
