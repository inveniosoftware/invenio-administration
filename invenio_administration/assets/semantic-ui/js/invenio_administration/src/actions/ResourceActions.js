import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Icon } from "semantic-ui-react";
import { ActionForm } from "../formik";
import ActionModal from "./ActionModal";
import _isEmpty from "lodash/isEmpty";
import Overridable from "react-overridable";

const ResourceActions = ({
  resource,
  successCallback,
  actions,
  Element = Button,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState(undefined);
  const [modalBody, setModalBody] = useState(undefined);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalHeader(undefined);
    setModalBody(undefined);
  }, []);

  const onModalClose = useCallback(() => {
    setModalOpen(false);
    setModalHeader(undefined);
    setModalBody(undefined);
    successCallback();
  }, [successCallback]);

  const onModalTriggerClick = useCallback(
    (_e, { payloadSchema, dataName, dataActionKey }) => {
      setModalOpen(true);
      setModalHeader(dataName);
      setModalBody(
        <Overridable
          id={`InvenioAdministration.ResourceActions.ModalBody.${dataActionKey}`}
          actionKey={dataActionKey}
          actionSchema={payloadSchema}
          actionSuccessCallback={onModalClose}
          actionCancelCallback={closeModal}
          resource={resource}
          actionConfig={actions[dataActionKey]}
        >
          <ActionForm
            actionKey={dataActionKey}
            actionSchema={payloadSchema}
            actionSuccessCallback={onModalClose}
            actionCancelCallback={closeModal}
            resource={resource}
            actionConfig={actions[dataActionKey]}
          />
        </Overridable>
      );
    },
    [resource, actions, onModalClose, closeModal]
  );

  return (
    <>
      {Object.entries(actions).map(([actionKey, actionConfig]) => {
        const icon = actionConfig.icon;
        const labelPos = icon ? "left" : null;
        return (
          <Element
            key={actionKey}
            onClick={onModalTriggerClick}
            payloadSchema={actionConfig.payload_schema}
            dataName={actionConfig.text}
            dataActionKey={actionKey}
            basic
            icon={!_isEmpty(icon)}
            labelPosition={labelPos}
          >
            {!_isEmpty(icon) && <Icon name={icon} />}
            {actionConfig.text}...
          </Element>
        );
      })}
      <ActionModal modalOpen={modalOpen} resource={resource}>
        {modalHeader && <Modal.Header>{modalHeader}</Modal.Header>}
        {!_isEmpty(modalBody) && modalBody}
      </ActionModal>
    </>
  );
};

ResourceActions.propTypes = {
  resource: PropTypes.object.isRequired,
  successCallback: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  Element: PropTypes.node,
};

ResourceActions.defaultProps = {
  Element: Button,
};

export default Overridable.component(
  "InvenioAdministration.ResourceActions",
  ResourceActions
);
