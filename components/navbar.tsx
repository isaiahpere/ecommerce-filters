"use client";
import React from "react";
import Link from "next/link";

import { useFiltersContext } from "@/services/context";
import { ActionType } from "@/services/context/filters-context";
import { useCartContext } from "@/services/context";

const Navbar = () => {
  // Filter Context
  const {
    state: { searchQuery },
    dispatch,
  } = useFiltersContext();

  // CartContext
  const {
    state: { cart },
  } = useCartContext();

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
        {`Cart (${cart.length > 0 ? cart.length : 0})`}
      </Link>
    </nav>
  );
};

export default Navbar;
