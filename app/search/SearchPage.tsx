"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
}
const SearchPage = () => {
  const [products, setProducts] = React.useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTermFromUrl = searchParams.get("searchTerm");
    if (searchTermFromUrl) {
      axios
        .get(`/api/search?searchTerm=${searchTermFromUrl}`)
        .then((response) => {
          setProducts(response.data.products);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setProducts([]);
        });
    }
  }, [searchParams]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Search Results</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4 w-[90%] mx-auto">
        {products.map((product: Product, index) => {
          return (
            <div key={index}>
              <Link href={`/product/${product._id}`}>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
