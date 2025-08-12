import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProductList = () => {
  const products = [" ", " ", " ", " "];
  return (
    <div
      id="product"
      className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
        {products.map((products, index) => {
          return (
            <Link key={index} href={`/product/${index}`}>
              <Image
                src="/images/banner.jpg"
                alt=""
                height={500}
                width={500}
                className="max-w-[17rem] h-72 object-center object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="font-semibold text-lg">Very classic watch</h2>
                <p className="font-medium text-sm mt-1">$100</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
