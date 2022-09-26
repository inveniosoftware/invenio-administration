/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import React, { useContext } from "react";
import { SearchBar as SKSearchBar, Sort } from "react-searchkit";
import { SearchConfigurationContext } from "@js/invenio_search_ui/components";
import { i18next } from "@translations/invenio_administration/i18next";
import Overridable from "react-overridable";

export const SearchBar = (props) => {
  const { sortOptions, sortOrderDisabled } = useContext(SearchConfigurationContext);
  return (
    <Overridable id="SearchBarElement.layout">
      <div className="auto-column-grid rel-mt-3">
        <SKSearchBar />
        {sortOptions && (
          <Sort
            sortOrderDisabled={sortOrderDisabled}
            values={sortOptions}
            ariaLabel={i18next.t("Sort")}
            label={(cmp) => <>{cmp}</>} // eslint-disable-line react/jsx-no-useless-fragment
          />
        )}
      </div>
    </Overridable>
  );
};

export default Overridable.component("SearchBar", SearchBar);
