"use client";

import Filters from "@/components/filters";
import Products from "@/components/products/products";
import { useShoppingCartContext } from "@/services/context";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const {
    state: { products },
  } = useShoppingCartContext();

  return (
    <main className="flex min-h-screen p-6">
      <Filters />
      {/* Products */}
      {(!products.length || products.length <= 0) && (
        <div className="text-2xl font-semibold mt-10 ">
          <p>Loading Products....</p>
        </div>
      )}
      <Products products={products} />
    </main>
  );
};

export default Home;
