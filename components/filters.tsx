"use client";
import React, { useEffect, useState } from "react";

import { useFiltersContext } from "@/services/context";
import { ActionType } from "@/services/context/filters-context";
import { useRouter, useSearchParams } from "next/navigation";

const filterMap: any = {
  sort: ActionType.SORT_BY_PRICE,
  byStock: ActionType.FILTER_BY_STOCK,
  searchQuery: ActionType.FILTER_BY_SEARCH,
  byRating: ActionType.FILTER_BY_RATING,
};

const Filters = () => {
  const { state, dispatch } = useFiltersContext(); // filter context
  const { byStock, sort } = state; // destruct state

  return (
    <aside className="flex flex-col min-w-44 gap-2 mr-4">
      <span className="font-bold">Filter Products</span>
      <span>
        <input
          type="radio"
          id="ascending"
          className="mr-2"
          name="sort"
          onChange={() =>
            dispatch({
              type: ActionType.SORT_BY_PRICE,
              payload: { sort: "lowToHigh" },
            })
          }
          checked={sort === "lowToHigh"}
        />
        <label htmlFor="ascending">Ascending</label>
      </span>
      <span>
        <input
          type="radio"
          id="descending"
          className="mr-2"
          name="sort"
          onChange={() =>
            dispatch({
              type: ActionType.SORT_BY_PRICE,
              payload: { sort: "highToLow" },
            })
          }
          checked={sort === "highToLow"}
        />
        <label htmlFor="descending">Descending</label>
      </span>
      <span>
        <input
          type="checkbox"
          id="outOfStock"
          className="mr-2"
          name="outOfStock"
          onChange={() =>
            dispatch({
              type: ActionType.FILTER_BY_STOCK,
              payload: { byStock: !byStock },
            })
          }
          checked={byStock}
        />
        <label htmlFor="outOfStock">Show Out of Stock</label>
      </span>
      <button
        onClick={() => {
          dispatch({ type: ActionType.CLEAR_FILTERS });
        }}
        className="mt-4 w-1/2 bg-lime-300 py-1 rounded-lg hover:bg-lime-600 transition"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
