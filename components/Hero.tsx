import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center bg-white px-4 md:px-12 text-black">
      <div className="md:w-1/2 mt-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Welcome to Ghadi
        </h1>
        <p className="text-lg md:text-xl mt-4">
          Your go-to destination for all things fashion and style.
        </p>
        <Link href="#product">
          <button className="bg-black text-white px-4 py-2 mt-4 rounded-md ">
            Shop Now
          </button>
        </Link>
      </div>
      <div>
        <Image
          src="/images/bannerrr.png"
          alt="banner image"
          width={500}
          height={500}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
