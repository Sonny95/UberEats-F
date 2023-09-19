"use client";

import React from "react";
import Logo from "@/components/Logo";
import { useSelector, useDispatch } from "react-redux";

function afterPay() {
  const cart = useSelector((state) => state.cart.cartItem);
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);
  return (
    <div className="w-full">
      <Logo />
      <div className="w-1/2 h-full absolute top-1/4 left-2/4 transform -translate-x-2/4">
        <h1 className="text-2xl">Your order will be coming soon!</h1>

        <div className="w-full flex">
          <div className="left-0 float-left mt-5 w-3/4">
            {cart?.map((item) => (
              <div className=" p-5">
                {/* food one component */}
                <div className="border border-gray-500 flex w-full items-center justify-between">
                  <img
                    className="bg-yellow-200 h-24 w-24 ml-8"
                    src={item?.mealPic}
                    alt={item?.mealName}
                  ></img>
                  <div className="font-large w-2/5">{item?.mealName}</div>

                  <div className="font-large w-1/5">${item.mealPrice * item.cartQuantity}</div>
                </div>
              </div>
            ))}
            Paid ${(cartTotalAmount * 1.1).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default afterPay;
