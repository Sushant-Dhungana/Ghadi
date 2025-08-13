"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
}
const ProductList = () => {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    axios.get("/api/fetch-products").then((response) => {
      setProducts(response.data.products);
    });
  }, []);
  return (
    <div
      id="product"
      className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
        {products.map((product: Product, index) => {
          return (
            <Link key={index} href={`/product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                height={500}
                width={500}
                className="max-w-[17rem] h-72 object-center object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="font-medium text-sm mt-1">${product.price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
