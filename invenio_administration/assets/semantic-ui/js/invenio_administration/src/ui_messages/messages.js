/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";
import { Message as SemanticMessage } from "semantic-ui-react";

export const Message = ({ id, autoDismiss = null, removeNotification, ...props }) => {
  props = {
    ...props,
    autoDismiss: typeof props.autoDismiss === "undefined" ? null : props.autoDismiss
  };

  const handleDismiss = useCallback(() => {
    removeNotification(id);
  }, [removeNotification, id]);

  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(handleDismiss, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, handleDismiss]);

  return (
    <SemanticMessage
      id={id}
      floating
      {...props}
      onDismiss={handleDismiss}
      role="alert"
    />
  );
};

export const ErrorMessage = ({ id, header, content, removeNotification }) => (
  <Message
    negative
    icon="exclamation"
    header={header}
    content={content}
    id={id}
    removeNotification={removeNotification}
  />
);

export const SuccessMessage = ({ id, header, content, removeNotification }) => (
  <Message
    success
    icon="check"
    header={header}
    content={content}
    id={id}
    autoDismiss={5 * 1000} // in seconds
    removeNotification={removeNotification}
  />
);

Message.propTypes = {
  autoDismiss: PropTypes.number,
  removeNotification: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

ErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

SuccessMessage.propTypes = ErrorMessage.propTypes;
