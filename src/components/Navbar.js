"use client";

import React from "react";
import Image from "next/image";
import Logo from "./Logo";
import burger from "../../public/images/burgerMenu.png";
import location from "../../public/images/location.png";
import cartImg from "../../public/images/cartImg.png";
import SearchBar from "./restaurantPage/components/SearchBar";
import Link from "next/link";
import { useSelector } from "react-redux";

function Navbar() {
  const isLogin = useSelector((state) => state.user.isLogin); // Redux 상태에서 로그인 상태 가져오기
  const cart = useSelector((state) => state.cart);

  const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);

  return (
    <div className="w-full h-40 relative">
      <div className="absolute top-0 left-0 mt-8 flex items-center w-full">
        <Image src={burger} className="inline-block w-8 h-8 mr-4" alt="Burger Icon" />
        <Logo className="inline-block ml-2" />
        <button className="cursor-pointer w-40 h-12 bg-gray-200 rounded-full ml-10">
          Delivery
        </button>
        <button className="cursor-pointer w-40 h-12 bg-gray-200 rounded-full ml-10">
          <Image src={location} className="w-6 h-6 inline-block mr-2" alt="location"></Image>Address
        </button>

        {/* searchBar */}
        <SearchBar />

        {/* Button */}
        <Link href="/cartPage">
          <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-16 flex items-center justify-center">
            <Image src={cartImg} className="w-4 h-4 inline-block mr-2" alt="cart"></Image>Cart
            <div className="bg-gray-300 rounded-full h-6 w-8 flex items-center justify-center ml-2">
              {cartTotalQuantity}
            </div>
          </button>
        </Link>

        {isLogin ? (
          <Link href="/logoutPage">
            <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-5">
              LogOut
            </button>
          </Link>
        ) : (
          <>
            <Link href="/emailCheck">
              <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-5">
                Login
              </button>
            </Link>
            <Link href="/emailCheck">
              <button className="cursor-pointer w-32 h-12 bg-gray-200 rounded-full ml-5">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
