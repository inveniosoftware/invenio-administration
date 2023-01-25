import React, { Component } from "react";
import Overridable from "react-overridable";
import { Loader as UILoader } from "semantic-ui-react";
import PropTypes from "prop-types";
import { buildUID } from "react-searchkit";

export default class Loader extends Component {
  render() {
    const { isLoading, children, appName } = this.props;
    return (
      <Overridable
        id={buildUID("Loader.layout", "", appName)}
        isLoading={isLoading}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        appName={appName}
      >
        {isLoading ? (
          <UILoader active size="huge" inline="centered" />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>{children}</>
        )}
      </Overridable>
    );
  }
}

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  appName: PropTypes.string,
};

Loader.defaultProps = {
  isLoading: false,
  children: null,
  appName: "",
};
