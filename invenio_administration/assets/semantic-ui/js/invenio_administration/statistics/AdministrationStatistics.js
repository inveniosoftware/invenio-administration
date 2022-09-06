/*
 * This file is part of Invenio.
 * Copyright (C) 2022 CERN.
 *
 * Invenio is free software; you can redistribute it and/or modify it
 * under the terms of the MIT License; see LICENSE file for more details.
 */
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import React from "react";
import { InvenioAdministrationActionsApi } from "../api/actions";
import { Component } from "react";
import { Item } from "semantic-ui-react";
import PropTypes from "prop-types";

export class AdministrationStatistics extends Component {
  constructor() {
    super();
    this.state = {
      intervalHits: [],
      isLoading: false,
    };
  }

  fetchValues = async () => {
    const { apiEndpoint, query, sort, page, size } = this.props;
    return await InvenioAdministrationActionsApi.searchResource(
      apiEndpoint,
      query,
      sort,
      page,
      size
    );
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await this.fetchValues();
    console.log(response.data);
    this.setState({
      intervalHits: response.data.hits.hits.length,
      isLoading: false,
    });
  }

  render() {
    const { records, timeInterval, label } = this.props;
    const { intervalHits } = this.state;
    return (
      <Item>
        <Item.Content>
          <Item.Header>{records}</Item.Header>
          <Item.Description>{intervalHits}</Item.Description>
          <Item.Extra>
            {label} in the past {timeInterval}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

AdministrationStatistics.propTypes = {
  records: PropTypes.string,
  timeInterval: PropTypes.string,
  label: PropTypes.string,
  apiEndpoint: PropTypes.string.isRequired,
  query: PropTypes.string,
  sort: PropTypes.string,
  page: PropTypes.number,
  size: PropTypes.number,
};

AdministrationStatistics.defaultProps = {
  records: "",
  timeInterval: "week",
  label: "published",
  query: "created:[2017 TO 2023]",
  sort: "newest",
  page: 1,
  size: 5,
};
