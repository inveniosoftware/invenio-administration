/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */


import Overridable from "react-overridable";
import { Loader as UILoader } from "semantic-ui-react";
import PropTypes from "prop-types";

const Loader = ({ isLoading = false, children = null }) => {
  return (
    <Overridable id="Admin.Loader.layout" isLoading={isLoading} children={children}>
      {isLoading ? (
        <UILoader active size="huge" inline="centered" />
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
      )}
    </Overridable>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default Overridable.component("Loader", Loader);
