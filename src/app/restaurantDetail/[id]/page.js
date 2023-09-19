"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import axios from "axios";
import "tailwindcss/tailwind.css";
import Navbar from "@/components/Navbar";
import { addToCart } from "../../../redux/features/cartSlice";
import { initCart } from "../../../redux/features/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Post = ({ params }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state) => {
    console.log(state, "state");
    return state.cart.cartItem;
  });

  const { id } = params;
  const [foods, setFoods] = useState([]);
  const [resPic, setResPic] = useState([]);
  console.log(setResPic, "foodresId");
  console.log(foods[0]?.resId, "foodresId!");

  //from food table.
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/restaurant/${id}`)
        .then((response) => {
          setFoods(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const orderFromNewRes = (values) => {
    if (cart.resId !== values.resId) {
      // values.resId로 현재 메뉴의 resId를 가져옵니다.
      const response = confirm("Create a new order?");
      if (response) {
        alert("yes");
        dispatch(initCart());
      } else {
        alert("No");
      }
    }
  };

  const handleAddToCart = (values) => {
    orderFromNewRes(values);
    dispatch(addToCart(values));
    // 두 함수를 순차적으로 호출
  };

  //table from restaurants (need fetch res main pic)
  useEffect(() => {
    axios
      .get(`http://localhost:8000/restaurantt/${id}`)
      .then((response) => {
        setResPic(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="w-full p-10">
      <Navbar></Navbar>
      {resPic.length > 0 && <img src={resPic[0].restaurantPic} className="w-full h-60 mt-10"></img>}
      <div className="flex flex-wrap p-10">
        <div className=" w-full font-bold text-4xl mb-7 ">Menu</div>
        <div className="flex flex-wrap">
          {foods.map((values) => (
            <div className="w-1/4 px-5 mb-10 relative" key={values.id}>
              {/* TODO allert for cart */}
              <button
                onClick={() => {
                  // orderFromNewRes(values.resId);
                  handleAddToCart(values);
                }}
                className="text-white border-2 border-white font-extrabold z-10 rounded-full bg-black w-10 h-10 absolute top-5 right-10 hover:bg-gray-700"
              >
                +
              </button>
              <img src={values?.mealPic} className="w-full h-44 rounded-2xl z-0" />
              <div>{values?.mealName}</div>
              <div>${values?.mealPrice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
