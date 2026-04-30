/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import { useState, useCallback, createContext } from "react";
import PropTypes from "prop-types";
import { ErrorMessage, SuccessMessage } from "./messages";

export const NotificationContext = createContext({
  notifications: {},
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationController = ({ children }) => {
  const [nextNotificationID, setNextNotificationID] = useState(1);
  const [notifications, setNotifications] = useState({});

  const addNotification = useCallback(
    (notification) => {
      setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [nextNotificationID]: notification,
      }));
      setNextNotificationID((prevID) => prevID + 1);
    },
    [nextNotificationID]
  );

  const removeNotification = useCallback((notificationID) => {
    setNotifications((prevNotifications) => {
      const updated = { ...prevNotifications };
      delete updated[notificationID];
      return updated;
    });
  }, []);

  const renderNotification = useCallback(
    (id, notification) => {
      let MessageComponent = ErrorMessage;
      if (notification.type === "success") {
        MessageComponent = SuccessMessage;
      }

      return (
        <MessageComponent
          id={id}
          key={id}
          header={notification.title}
          content={notification.content}
          removeNotification={removeNotification}
        />
      );
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications: notifications,
        addNotification: addNotification,
        removeNotification: removeNotification,
      }}
    >
      <div id="admin-notifications" className="compact">
        {Object.entries(notifications).map(([messageID, message]) =>
          renderNotification(messageID, message)
        )}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationController.propTypes = {
  children: PropTypes.element.isRequired,
};
