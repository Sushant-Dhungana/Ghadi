import Link from "next/link";
import React from "react";
import { LuWatch } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link href="/">
          <LuWatch className="text-4xl sm:4xl" />
        </Link>
      </div>
      <div className="relative max-w-[300px] md:w-[400px] sm:w-[100px]">
        <div className="absolute inset-y-0 start-0 flex items-center pl-2">
          <IoIosSearch className=" h-6 w-6" />
        </div>
        <input
          type="text"
          placeholder="Search"
          className=" p-2 bg-gray-200 rounded-[8px] border-2 border-slate-300/[0.7] h-[36px] pl-10 w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        />
      </div>
      <div>
        <Link href="#">
          <button className="px-4 py-2 bg-[#212529] text-white rounded-md border-2 border-[#212529] cursor-pointer hover:border-[#212529] hover:text-[#212529] hover:bg-[#ffffff] transition duration-300 ease-in-out">
            Add product
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
