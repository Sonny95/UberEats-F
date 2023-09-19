"use client";

import Logo from "@/components/Logo";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  decreasmentQuantity,
  removeItem,
  addToCart,
  initCart,
  updateTotals,
} from "../../redux/features/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const [res, setRes] = useState([]);

  const cart = useSelector((state) => state.cart.cartItem);

  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  useEffect(() => {
    dispatch(updateTotals());
  }, [cart]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/resDelivery")
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRemoveCart = (cartItem) => {
    dispatch(removeItem(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreasmentQuantity(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleInitCart = () => {
    dispatch(initCart());
  };

  return (
    <div className="p-10 w-full">
      <Logo />
      <div className="mt-10 font-semibold text-3xl">Cart</div>
      <div className="w-full flex">
        <div className="left-0 float-left mt-5 w-3/4">
          {cart?.map((item) => (
            <div className=" w-full p-5">
              {/* food one component */}
              <div className="border border-gray-500 flex w-full items-center justify-between">
                <img
                  className="bg-yellow-200 h-24 w-24 ml-8"
                  src={item?.mealPic}
                  alt={item?.mealName}
                ></img>
                <div className="font-large w-2/5">{item?.mealName}</div>

                <div className="font-large w-1/5 flex items-center justify-center">
                  <button
                    onClick={() => handleDecreaseCart(item)}
                    className="text-white mx-3 font-extrabold z-10 rounded-full bg-black w-8 h-8 hover:bg-gray-700"
                  >
                    -
                  </button>

                  <input type="number" value={item?.cartQuantity} className="w-8 text-center" />

                  <button
                    onClick={() => handleIncreaseCart(item)}
                    className="text-white mx-3 font-extrabold z-10 rounded-full bg-black w-8 h-8 hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>

                <div className="font-large w-1/5">${item.mealPrice * item.cartQuantity}</div>
                <button onClick={() => handleRemoveCart(item)} className="font-large w-1/5">
                  remove
                </button>
              </div>
            </div>
          ))}
          <div className=" p-10 -mt-5">
            <button onClick={() => handleInitCart()} className="border border-gray-500 w-28">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="border border-gray-500 w-1/4 p-5 inline-block ml-4">
          <div className="bg-yellow-100w-full ">
            <div className="font-large mb-4">
              Subtotal : $
              {cart.reduce((subtotal, item) => subtotal + item.mealPrice * item.cartQuantity, 0)}
            </div>
            <div className="font-large mb-4">
              Delivery Fee ${" "}
              {res.find((restaurant) => restaurant.id === cart[0]?.resId)?.deliveryFee}
            </div>
            <div className="font-large mb-4">
              Taxes & Other Fees : $
              {(
                cart.reduce((subtotal, item) => subtotal + item.mealPrice * item.cartQuantity, 0) *
                0.1
              ).toFixed(2)}
            </div>
            <div className="font-large mb-4">Total: ${(cartTotalAmount * 1.1).toFixed(2)}</div>
            <Link href="/paymentPage">
              <button className="w-full h-12 bg-gray-300 rounded-lg font-large ">
                Go to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
