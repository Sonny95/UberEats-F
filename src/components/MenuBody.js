"use client";

import Image from "next/image";
import banner from "../../public/images/banner.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./mainPage/Footer";
import LeftCategories from "./menu/LeftComponents/LeftCategories";
import Restaurants from "./menu/RightComponents/Restaurants";
import MenuCategories from "./menu/RightComponents/MenuCategories";

function MenuBody() {
  const [foods, setFoods] = useState([]);
  const [menu, setMenu] = useState([]);
  const [filters, setFilters] = useState({ continents: [], sort: [] });
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/menu")
      .then((response) => {
        setMenu(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getProduct = () => {
    axios
      .get("http://localhost:8000/foods", {
        params: { filters }, // Include filters in the request parameters
      })
      .then((response) => {
        setFoods(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const showFilterResults = (filters) => {
    const variables = {
      skip: 0,
      limit: limit,
      filters: filters,
    };
    getProduct(variables);
    setSkip(0);
  };

  const handleFilters = (newFilters, category) => {
    console.log(newFilters);

    const updatedFilters = { ...filters };
    updatedFilters[category] = newFilters;

    if (category === "sort") {
      // Handle sorting logic here
    }
    showFilterResults(updatedFilters);
    setFilters(updatedFilters);
  };

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
          <Restaurants foods={foods} />
          <MenuCategories menu={menu} />
        </div>
      </div>
      <div className="w-full bg-gray-300 h-0.5 mb-4 mt-4"></div>
      <Footer />
    </div>
  );
}

export default MenuBody;
