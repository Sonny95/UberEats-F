"use client";

import Image from "next/image";
import banner from "../../public/images/banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./mainPage/Footer";
import LeftCategories from "./restaurantPage/LeftComponents/LeftCategories";
import Restaurants from "./restaurantPage/RightComponents/Restaurants";
import MenuCategories from "./restaurantPage/RightComponents/MenuCategories";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { searchBySort, showAllRestaurants } from "../features/restaurants/restaurantsAction";

function MenuBody() {
  const { restaurantsData, loading, success, error, sort } = useSelector(
    (state) => state.restaurants
  );
  const dispatch = useDispatch();

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    dispatch(showAllRestaurants(sort));
    if (sort) {
      dispatch(searchBySort(sort));
    }
    if (error) {
      console.log(error);
    }
  }, [dispatch, error, success, sort]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/menu")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className=" w-full">
      <div className="w-full h-1/7 mb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold">Crave it? Get it.</div>
          <div>Search for a favorite restaurant, cuisine, or dish.</div>
        </div>
        <div className="w-2/3">
          <Image alt="banner" src={banner} className="rounded-2xl m-auto w-auto h-auto" />
        </div>
      </div>
      <div className="w-full flex font-semibold">
        {/* Left */}

        <LeftCategories />

        {/* Right */}
        <div className="flex flex-wrap w-full m-10 ">
          <div className="flex flex-wrap">
            {loading ? (
              <h1>loading…</h1>
            ) : (
              restaurantsData.length > 0 && <Restaurants foods={restaurantsData} />
            )}
          </div>
          <MenuCategories menu={menu} />
        </div>
      </div>
      <div className="w-full bg-gray-300 h-0.5 mb-4 mt-4"></div>
      <Footer />
    </div>
  );
}

export default MenuBody;
