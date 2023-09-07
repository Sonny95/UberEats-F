"use client";

import Navbar from "@/components/Navbar";
import NavMenu from "@/components/NavMenu";
import Image from "next/image";
import banner from "../../../public/images/banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/mainPage/Footer";
import Restaurants from "@/components/restaurantPage/RightComponents/Restaurants";
import MenuCategories from "@/components/restaurantPage/RightComponents/MenuCategories";
import SortCheckBox from "@/components/restaurantPage/SortCheckBox";
import FromCheckBox from "@/components/restaurantPage/FromCheckBox";
import PriceCheckBox from "@/components/restaurantPage/PriceCheckBox";
import DietCheckBox from "@/components/restaurantPage/DietCheckBox";

import { useSelector, useDispatch } from "react-redux";
import { searchBySort, showAllRestaurants } from "../../redux/features/restaurantsAction";

function Restaurant() {
  const restaurantsData = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    dispatch(showAllRestaurants(restaurantsData.sort));
    if (restaurantsData.sort !== "") {
      dispatch(searchBySort(restaurantsData.sort));
    }
    if (restaurantsData.error !== "") {
      console.log(restaurantsData.error);
    }
  }, [restaurantsData.sort]);

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
    <div className="m-8">
      <Navbar />
      <NavMenu />
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

          <div className="left-0 w-1/5 h-1/2 flaot-left ">
            <div className="text-3xl">All stores</div>

            <SortCheckBox />

            <FromCheckBox />

            <PriceCheckBox />

            <DietCheckBox />
          </div>

          {/* Right */}
          <div className="flex flex-wrap w-full m-10 ">
            <div className="flex flex-wrap w-full">
              {restaurantsData.loading ? (
                <h1>loading…</h1>
              ) : (
                restaurantsData.restaurantsData?.length > 0 && (
                  <Restaurants foods={restaurantsData.restaurantsData} />
                )
              )}
            </div>
            <MenuCategories menu={menu} />
          </div>
        </div>
        <div className="w-full bg-gray-300 h-0.5 mb-4 mt-4"></div>
        <Footer />
      </div>
    </div>
  );
}

export default Restaurant;
