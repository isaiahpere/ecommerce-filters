"use client";
import React from "react";

import { useFiltersContext } from "@/services/context";
import { ActionType } from "@/services/context/filters-context";
import Link from "next/link";

const Navbar = () => {
  const {
    state: { searchQuery },
    dispatch,
  } = useFiltersContext();

  return (
    <nav className="h-5 flex items-center justify-between p-6">
      <Link href={"/"}>
        <h2 className="text-2xl font-mono">Ecommerce Store</h2>
      </Link>
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
      <Link
        className="px-4 py-2 bg-slate-500 text-white rounded-md "
        href={"/cart"}
      >
        Cart (0)
      </Link>
    </nav>
  );
};

export default Navbar;
