// This file is part of InvenioAdministration
// Copyright (C) 2022 CERN.
// Copyright (C) 2024 KTH Royal Institute of Technology.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { useState, useContext, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import { i18next } from "@translations/invenio_administration/i18next";
import { Modal } from "semantic-ui-react";
import isEmpty from "lodash/isEmpty";
import { ErrorMessage } from "../ui_messages/messages";
import { NotificationContext } from "../ui_messages/context";
import Overridable from "react-overridable";
import { InvenioAdministrationActionsApi } from "../api/actions";

const DeleteModal = ({
  title,
  apiEndpoint,
  successCallback,
  toggleModal,
  modalOpen,
  children = null,
  ...restProps
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const cancelButton = useRef(null);
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    cancelButton.current?.focus();
  });

  const cleanError = useCallback(() => {
    setError(undefined);
  }, []);

  const resetErrorState = useCallback(() => {
    setError(undefined);
  }, []);

  const handleOnButtonClick = useCallback(async () => {
    setLoading(true);
    try {
      await InvenioAdministrationActionsApi.deleteResource(apiEndpoint);
      setLoading(false);
      toggleModal(false);
      addNotification({
        title: i18next.t("Success"),
        content: i18next.t("Resource was successfully deleted."),
        type: "success",
      });
      successCallback();
    } catch (e) {
      setLoading(false);
      setError({
        header: i18next.t("Action error"),
        content: e.message,
        id: e.code,
      });
    }
  }, [apiEndpoint, toggleModal, addNotification, successCallback]);

  return (
    <Overridable
      id="DeleteModal.layout"
      title={title}
      apiEndpoint={apiEndpoint}
      successCallback={successCallback}
      toggleModal={toggleModal}
      modalOpen={modalOpen}
      children={children}
      handleOnButtonClick={handleOnButtonClick}
      cleanError={cleanError}
      resetErrorState={resetErrorState}
      {...restProps}
    >
      <Modal role="dialog" open={modalOpen}>
        <Modal.Header as="h2">
          {i18next.t("Delete {{title}}", { title: title })}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {children}
            {!isEmpty(error) && (
              <ErrorMessage {...error} removeNotification={resetErrorState} />
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            ref={cancelButton}
            icon="cancel"
            onClick={() => {
              cleanError();
              toggleModal(false);
            }}
            content={i18next.t("Cancel")}
            floated="left"
            size="medium"
          />
          <Button negative onClick={handleOnButtonClick} loading={loading}>
            <Icon name="trash alternate" />
            {i18next.t("Delete")}
          </Button>
        </Modal.Actions>
      </Modal>
    </Overridable>
  );
};

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  successCallback: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

DeleteModal.defaultProps = {
  children: null,
};

export default Overridable.component("DeleteModal", DeleteModal);
