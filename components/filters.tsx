"use client";
import React from "react";

import { useFiltersContext } from "@/services/context";
import { ActionType } from "@/services/context/filters-context";

const Filters = () => {
  const { state, dispatch } = useFiltersContext();
  const { byStock, byRating, searchQuery, sort } = state;

  console.log(state);

  return (
    <aside className="flex flex-col min-w-56 gap-2 mr-4">
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
