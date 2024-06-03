import Image from "next/image";
import { ProductType } from "@/app/types";
import React, { useState } from "react";

interface ProductsProps {
  products: ProductType[];
}

const Products = ({ products }: ProductsProps) => {
  const [page, setPage] = useState(1);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-[1100px]:grid-cols-3 gap-x-4 gap-y-2">
      {products.length > 0 &&
        products.map((product) => (
          <div
            key={product.id}
            className="w-full h-[200px] bg-gray-100 flex flex-col items-center justify-center relative m-2 rounded-lg shadow-md p-2 gap-2"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={0}
              height={0}
              priority
              sizes="100vw"
              style={{ width: "auto", maxWidth: "240px", height: "140px" }}
              className="object-cover"
            />
            <span className=" mt-1 text-slate-700 text-center text-sm">
              {product.title} - ${product.price}
            </span>
          </div>
        ))}
    </section>
  );
};

export default Products;
