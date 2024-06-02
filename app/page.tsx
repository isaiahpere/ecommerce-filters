"use client";

import { useShoppingCartContext } from "../services/context/shopping-cart-context";

export default function Home() {
  const cart = useShoppingCartContext();
  console.log(cart);
  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1>E-Commerce Filters</h1>
    </main>
  );
}
