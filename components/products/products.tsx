"use client";
import Image from "next/image";
import React, { useMemo } from "react";

import { useFiltersContext } from "@/services/context";
import { useCartContext } from "@/services/context";
import { CartActionType } from "@/services/context/cart-context";

import { ProductType } from "@/app/types";

interface ProductsProps {
  products: ProductType[];
}
const Products = ({ products }: ProductsProps) => {
  const {
    state: { sort, byStock, searchQuery },
  } = useFiltersContext();

  const {
    state: { cart },
    dispatch: cartDispatch,
  } = useCartContext();

  console.log(cart);

  // Filter Products base on filter criteria
  const filteredProducts = useMemo(() => {
    let filteredProducts = products;

    // sort products
    if (sort) {
      filteredProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // filter by stock
    if (!byStock) {
      filteredProducts = filteredProducts.filter((product) => product.inStock);
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((prod) =>
        prod.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    }

    return filteredProducts;
  }, [sort, byStock, searchQuery]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-[1100px]:grid-cols-3 gap-x-4 gap-y-2">
      {filteredProducts.length > 0 &&
        filteredProducts.map((product) => {
          let isInCart = cart.find((item) => item.product.id === product.id);

          return (
            <div
              key={product.id}
              className="w-full h-[300px] bg-gray-100 flex flex-col items-center justify-center relative m-2 rounded-lg shadow-md p-2 gap-2"
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={0}
                height={0}
                priority
                sizes="100vw"
                style={{ width: "auto", maxWidth: "240px", height: "200px" }}
                className="object-cover"
              />
              <span className=" mt-1 text-slate-700 text-center text-sm">
                {product.title} - ${product.price}
              </span>
              {!product.inStock && <span>Out of Stock</span>}
              <button
                className={`bg-lime-400 py-1 px-3 rounded-md hover:bg-lime-600 transition ${
                  !product.inStock && "bg-gray-400 hover:bg-gray-400 opacity-75"
                }`}
                disabled={!product.inStock}
                onClick={() =>
                  cartDispatch({
                    type: isInCart
                      ? CartActionType.REMOVE_ITEM
                      : CartActionType.ADD_ITEM,
                    payload: { product, qty: 1 },
                  })
                }
              >
                {product.inStock
                  ? isInCart
                    ? "Remove Item"
                    : "Add Item"
                  : "Sold Out"}
              </button>
            </div>
          );
        })}
    </section>
  );
};

export default Products;
