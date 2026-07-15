/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import { withState } from "react-searchkit";
import { Input } from "semantic-ui-react";
import PropTypes from "prop-types";
import { i18next } from "@translations/invenio_administration/i18next";

export const SearchBarElement = withState(
  ({
    updateQueryState,
    currentQueryState,
    onInputChange,
    queryString = "",
    uiProps = undefined,
    placeholder = i18next.t("Search ..."),
  }) => {
    const onBtnSearchClick = () => {
      updateQueryState({ ...currentQueryState, queryString });
    };
    const onKeyPress = (event) => {
      if (event.key === "Enter") {
        updateQueryState({ ...currentQueryState, queryString });
      }
    };
    return (
      <Input
        action={{
          "icon": "search",
          "onClick": onBtnSearchClick,
          "className": "search",
          "aria-label": i18next.t("Search"),
        }}
        fluid
        placeholder={placeholder}
        onChange={(event, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        onKeyPress={onKeyPress}
        aria-label={i18next.t("Search")}
        {...uiProps}
      />
    );
  }
);

SearchBarElement.propTypes = {
  queryString: PropTypes.string.isRequired,
  updateQueryState: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  uiProps: PropTypes.object,
};
