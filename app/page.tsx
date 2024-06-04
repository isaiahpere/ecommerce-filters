"use client";

import Filters from "@/components/filters";
import Products from "@/components/products/products";
import { useShoppingCartContext } from "@/services/context";

const Home = () => {
  const {
    state: { products },
  } = useShoppingCartContext();

  // Loading Products Message
  if (!products.length || products.length <= 0) {
    return (
      <div className="w-full text-center text-2xl font-semibold mt-10 ">
        <p>Loading Products....</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen p-6">
      <Filters />
      <Products products={products} />
    </main>
  );
};

export default Home;
