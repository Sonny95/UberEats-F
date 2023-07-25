"use client";

import React from "react";
import Image from "next/image";
import Logo from "./Logo";
import burger from "../../public/images/burgerMenu.png";
import location from "../../public/images/location.png";
import cart from "../../public/images/cart.png";
import SearchBar from "./restaurantPage/components/SearchBar";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full h-40 relative">
      <div className="absolute top-0 left-0 mt-8 flex items-center w-full">
        <Image src={burger} className="inline-block w-8 h-8 mr-4" alt="Burger Icon" />
        <Logo className="inline-block ml-2" />
        <button className="cursor-pointer w-40 h-12 bg-gray-200 rounded-full ml-10">Delivery</button>
        <button className="cursor-pointer w-40 h-12 bg-gray-200 rounded-full ml-10">
          <Image src={location} className="w-6 h-6 inline-block mr-2" alt="location"></Image>Address
        </button>

        {/* searchBar */}
        <SearchBar />

        {/* Button */}
        <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-16">
          <Image src={cart} className="w-4 h-4 inline-block mr-2" alt="cart"></Image>Cart
        </button>
        <Link href="/emailCheck">
          <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-5">Login</button>
        </Link>
        <Link href="/emailCheck">
          <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-5">Signup</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
