import _get from "lodash/get";

const APIRoutesGenerators = {
  detailsView: (routePrefix, resource, idKeyPath = "pid") => {
    return `${routePrefix}/${_get(resource, idKeyPath)}`;
  },
  get: (routePrefix, pid) => {
    return `${routePrefix}/${pid}`;
  },
  search: (routePrefix, query, sort, page, size) => {
    return `${routePrefix}?q=${query}&sort=${sort}&page=${page}&size=${size}`;
  },
};

export const APIRoutes = {
  ...APIRoutesGenerators,
};