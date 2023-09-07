import React from "react";
import Image from "next/image";
import Bgphoto from "public/images/background.png";
import Logo from "../Logo";
import burger from "public/images/burgerMenu.png";
import Link from "next/link";

function BackGround() {
  return (
    <div>
      <Image src={Bgphoto} alt="Background" />
      <div className="absolute top-0 left-0 mt-8 ml-8 flex items-center ">
        <Image src={burger} className="inline-block w-8 h-8 mr-4" alt="Burger Icon" />
        <Logo className="inline-block ml-2" />
      </div>
      <div className="absolute top-0  right-8 mt-8 ml-8 flex items-center">
        <Link href="/emailCheck">
          <button
            src={burger}
            className="inline-block w-28 h-12 mr-4 bg-white font-semibold rounded-full"
            alt="Burger Icon"
          >
            Log In
          </button>
        </Link>
        <Link href="/emailCheck">
          <button
            src={burger}
            className="inline-block w-28 h-12 mr-4 bg-black text-white font-semibold rounded-full"
            alt="Burger Icon"
          >
            Sign Up
          </button>
        </Link>
      </div>
      <div className="absolute top-1/3 left-0 mt-8 ml-8 transform w-full">
        <div className="text-5xl font-bold mb-10 ">Order food to your door</div>
        <input placeholder="Enter Delivery Address " className=" w-1/3 h-11 inline-block"></input>
        <Link href="/restaurant">
          <button className="w-44 bg-white inline-block h-11 ml-3">Deliver now </button>
        </Link>
        <Link href="/restaurant">
          <button className="w-32 inline-block h-11 ml-3 rounded-md bg-black text-white">
            Find food
          </button>
        </Link>
        <div className="absolute mt-5">
          <span className="underline cursor-pointer">Sign</span>
          <span> for your recent addresses</span>
        </div>
      </div>
    </div>
  );
}

export default BackGround;
