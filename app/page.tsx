"use client";

import { useShoppingCartContext } from "@/services/context";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  const {
    state: { products },
  } = useShoppingCartContext();
  console.log(products);

  // console.log(cart.state.products);
  // console.log("PRODUCTS ABOVE");

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      {/* Filters */}
      {/* Products */}
      {/* {products.length > 0 &&
        products.slice(page * 10 - 10).map((product) => (
          <span key={product.id} className="relative">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={0}
              height={0}
              priority
              style={{ width: "200px", height: "200px" }}
            />
          </span>
        ))} */}
    </main>
  );
};

export default Home;
