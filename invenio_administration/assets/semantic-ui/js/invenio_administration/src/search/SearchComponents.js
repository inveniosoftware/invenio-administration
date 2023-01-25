/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */

import { SearchResultItem } from "./SearchResultItem";
import SearchEmptyResults from "./SearchEmptyResults";
import { SearchResultsContainer } from "./SearchResultsContainer";
import { SearchResults } from "./SearchResults";
import { parametrize } from "react-overridable";
import { DropdownSort } from "@js/invenio_search_ui/components";
import { SearchBarElement } from "./SearchBarElement";
import _get from "lodash/get";
import {
  ContribSearchAppFacets,
  ContribBucketAggregationElement,
  ContribBucketAggregationValuesElement,
} from "@js/invenio_search_ui/components";
import { SearchBar } from "./SearchBar";
import _mapKeys from "lodash/mapKeys";

export const initDefaultSearchComponents = (domContainer, appId = "") => {
  const sortColumns = (columns) =>
    Object.entries(columns).sort((a, b) => a[1].order - b[1].order);
  const title = JSON.parse(domContainer.dataset.title);
  const resourceName = JSON.parse(domContainer.dataset.resourceName);
  const columns = JSON.parse(domContainer.dataset.fields);
  const sortedColumns = sortColumns(columns);
  const displaySearch = JSON.parse(domContainer.dataset.displaySearch);
  const displayEdit = JSON.parse(domContainer.dataset.displayEdit);
  const displayDelete = JSON.parse(domContainer.dataset.displayDelete);
  const displayRead = JSON.parse(domContainer.dataset.displayRead);
  const actions = JSON.parse(domContainer.dataset.actions);
  const apiEndpoint = _get(domContainer.dataset, "apiEndpoint");
  const idKeyPath = JSON.parse(_get(domContainer.dataset, "pidPath", "pid"));
  const listUIEndpoint = domContainer.dataset.listEndpoint;
  const resourceSchema = JSON.parse(domContainer.dataset.resourceSchema);

  const ResultsContainerWithConfig = parametrize(SearchResultsContainer, {
    columns: sortedColumns,
    displayEdit: displayEdit,
    displayDelete: displayDelete,
    actions: actions,
  });

  const SearchResultsWithConfig = parametrize(SearchResults, {
    columns: sortedColumns,
  });

  const SearchResultItemWithConfig = parametrize(SearchResultItem, {
    title: title,
    resourceName: resourceName,
    columns: sortedColumns,
    displayRead: displayRead,
    displayEdit: displayEdit,
    displayDelete: displayDelete,
    actions: actions,
    apiEndpoint: apiEndpoint,
    idKeyPath: idKeyPath,
    listUIEndpoint: listUIEndpoint,
    resourceSchema: resourceSchema,
    appName: appId,
  });

  const components = {
    "ResultsList.item": SearchResultItemWithConfig,
    "BucketAggregation.element": ContribBucketAggregationElement,
    "BucketAggregationValues.element": ContribBucketAggregationValuesElement,
    "ResultsGrid.item": () => null,
    "SearchApp.results": SearchResultsWithConfig,
    "ResultsList.container": ResultsContainerWithConfig,
    "EmptyResults.element": SearchEmptyResults,
    "Sort.element": DropdownSort,
    "SearchApp.facets": ContribSearchAppFacets,
    "SearchApp.searchbarContainer": SearchBar,
    "SearchApp.resultOptions": () => null,
    "SearchBar.element": displaySearch ? SearchBarElement : () => null,
  };

  if (appId) {
    const nameSpacedComponents = _mapKeys(components, function (value, key) {
      return `${appId}.${key}`;
    });
    return nameSpacedComponents;
  }

  return components;
};
