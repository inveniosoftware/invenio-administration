/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import PropTypes from "prop-types";
import { BucketAggregation, RangeFacet } from "react-searchkit";

export const SearchFacets = ({ aggs }) => {
  return (
    <>
      {aggs.map((agg) => {
        return (
          <div className="facet-container" key={agg.title}>
            {agg.type === "date" ? (
              <RangeFacet
                title={agg.title}
                agg={agg}
                rangeSeparator={agg.separator || ".."}
              />
            ) : (
              <BucketAggregation title={agg.title} agg={agg} />
            )}
          </div>
        );
      })}
    </>
  );
};

SearchFacets.propTypes = {
  aggs: PropTypes.array.isRequired,
};
