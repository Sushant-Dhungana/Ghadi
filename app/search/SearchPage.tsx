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
      <h1>Search Results</h1>
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
  );
};

export default SearchPage;
