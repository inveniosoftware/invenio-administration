/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { i18next } from "@translations/invenio_administration/i18next";
import { Button, Icon } from "semantic-ui-react";
import DeleteModal from "./DeleteModal";
import { Modal } from "semantic-ui-react";
import _get from "lodash/get";
import Overridable from "react-overridable";

export const DeleteModalTrigger = ({
  title,
  resourceName,
  apiEndpoint,
  resource,
  successCallback,
  idKeyPath,
  Element = Button,
  disabled = false,
  disabledDeleteMessage = "",
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback((open) => {
    setModalOpen(open);
  }, []);

  const triggerId = `delete-modal-trigger-${resource.id}`;

  return (
    <Overridable id="InvenioAdministration.DeleteModalTrigger">
      <>
        <Element
          id={triggerId}
          disabled={disabled}
          icon
          negative
          onClick={() => toggleModal(true)}
          aria-label={i18next.t("Delete")}
          aria-controls="delete-modal"
          aria-expanded={modalOpen}
          aria-haspopup="dialog"
          title={disabledDeleteMessage}
        >
          <Icon name="trash alternate" />
        </Element>
        <DeleteModal
          id="delete-modal"
          aria-labelledby={triggerId}
          title={title}
          apiEndpoint={apiEndpoint}
          resource={resource}
          successCallback={successCallback}
          idKeyPath={idKeyPath}
          toggleModal={toggleModal}
          modalOpen={modalOpen}
        >
          <Modal.Content>
            <Modal.Description>
              {i18next.t("Are you sure you want to delete {{resourceName}}?", {
                resourceName: _get(resource, resourceName),
              })}
            </Modal.Description>
          </Modal.Content>
        </DeleteModal>
      </>
    </Overridable>
  );
};

DeleteModalTrigger.propTypes = {
  title: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  resource: PropTypes.object.isRequired,
  successCallback: PropTypes.func.isRequired,
  Element: PropTypes.object,
  idKeyPath: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  disabledDeleteMessage: PropTypes.string,
};
