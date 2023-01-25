import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import Overridable from "react-overridable";
import PropTypes from "prop-types";
import { i18next } from "@translations/invenio_administration/i18next";
import { buildUID } from "react-searchkit";

export default class ErrorPage extends Component {
  render() {
    const { errorCode, errorMessage, error, children, appName } = this.props;
    return (
      <Overridable
        id={buildUID("ErrorPage.layout", "", appName)}
        errorCode={errorCode}
        errorMessage={errorMessage}
        error={error}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        appName={appName}
      >
        {error ? (
          <Container textAlign="center" className="error-handler">
            <Header as="h1" icon>
              <Icon name="warning" circular />
              {errorCode}
              <Header.Subheader>{errorMessage}</Header.Subheader>
            </Header>
          </Container>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{children}</>
        )}
      </Overridable>
    );
  }
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  children: PropTypes.element,
  appName: PropTypes.string,
};

ErrorPage.defaultProps = {
  errorCode: i18next.t("Error"),
  errorMessage: i18next.t("Server was not able to process your request."),
  error: false,
  children: undefined,
  appName: "",
};
