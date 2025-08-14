"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { LuWatch } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", e.target.value);

    const searchQuery = urlParams.toString();
    window.history.replaceState({}, "", `?${searchQuery}`);
    router.push(`/search?${searchQuery}`);
    if (e.target.value === "") {
      router.push("/");
    }
  };

  return (
    <nav className="bg-white text-black border-b border-gray-200">
      <div className="flex justify-between items-center px-4 md:px-12 py-4">
        {/* Logo */}
        <Link href="/">
          <LuWatch className="text-4xl sm:text-5xl" />
        </Link>

        {/* Hamburger Button (mobile only) */}
        <button
          className="sm:hidden text-3xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          {/* Search */}
          <div className="relative sm:max-w-[200px] md:w-[400px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoIosSearch className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
            </div>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search"
              className="bg-gray-200 rounded-[8px] border-2 border-slate-300/[0.7] h-[36px] pl-9 w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
            />
          </div>

          {/* Button */}
          <Link href="/add-product">
            <button className="px-4 py-2 bg-[#212529] text-white rounded-md border-2 border-[#212529] hover:border-[#212529] hover:text-[#212529] hover:bg-white transition duration-300 ease-in-out">
              Add product
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-4">
          {/* Search */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoIosSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search"
              className="bg-gray-200 rounded-[8px] border-2 border-slate-300/[0.7] h-[36px] pl-9 w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
            />
          </div>

          {/* Button */}
          <Link href="/add-product">
            <button className="w-full px-4 py-2 bg-[#212529] text-white rounded-md border-2 border-[#212529] hover:border-[#212529] hover:text-[#212529] hover:bg-white transition duration-300 ease-in-out">
              Add product
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
