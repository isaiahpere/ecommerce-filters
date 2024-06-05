"use client";
import React from "react";
import Image from "next/image";

import { CartActionType } from "@/services/context/cart-context";
import { useCartContext } from "@/services/context";
import Link from "next/link";

const Cart = () => {
  // cart Context
  const {
    state: { cart },
    dispatch,
  } = useCartContext();

  let cartTotal = cart.reduce((accu, curr) => {
    return accu + curr.product.price;
  }, 0);

  return (
    <main className="py-9">
      <h1 className="text-2xl text-center w-full">Shopping Cart</h1>
      {!cart.length && (
        <section className="flex flex-col items-center gap-2 mt-14">
          <p className="text-xl text-slate-900 font-semibold">
            Ooopsie! No Items In your Cart
          </p>
          <Link
            href={"/"}
            className="bg-lime-400 py-2 px-10 rounded-md hover:bg-lime-600"
          >
            Shop items
          </Link>
        </section>
      )}

      {cart.length > 0 && (
        <section className="mt-8 flex flex-col gap-5">
          {cart.map(({ product }) => (
            <div
              key={product.id}
              className="flex h-36 items-center justify-between border-2 p-5"
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={product.thumbnail}
                style={{ width: "144px" }}
                alt={product.title}
              />
              <div className="flex flex-col text-center w-1/3">
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-slate-600">${product.price.toFixed(2)}</p>
              </div>
              <button
                className="bg-red-700 text-white py-1 px-2 text-sm rounded-lg hover:bg-red-800 transition"
                onClick={() => {
                  dispatch({
                    type: CartActionType.REMOVE_ITEM,
                    payload: { product, qty: 1 },
                  });
                }}
              >
                Remove Item
              </button>
            </div>
          ))}
          <div className="w-full text-center mt-4 ">
            <p className="text-xl font-semibold">
              Cart Subtotal:{" "}
              <span className="underline underline-offset-2">
                $
                {cart
                  .reduce((accu, curr) => {
                    return accu + curr.product.price;
                  }, 0)
                  .toFixed(2)}
              </span>
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
