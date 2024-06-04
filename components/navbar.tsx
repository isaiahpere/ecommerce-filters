"use client";
import React from "react";

import { useFiltersContext } from "@/services/context";
import { ActionType } from "@/services/context/filters-context";

const Navbar = () => {
  const {
    state: { searchQuery },
    dispatch,
  } = useFiltersContext();

  return (
    <nav className="h-5 flex items-center justify-between p-6">
      <h2 className="text-2xl font-mono">Ecommerce Store</h2>
      <input
        type="text"
        placeholder="Search for product..."
        className="p-2"
        value={searchQuery}
        onChange={(e) => {
          dispatch({
            type: ActionType.FILTER_BY_SEARCH,
            payload: { searchQuery: e.target.value },
          });
        }}
      />
    </nav>
  );
};

export default Navbar;
