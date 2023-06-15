import React from "react";
import Navbar from "../components/Navbar";
import NavMenu from "../components/NavMenu";
import MenuBody from "../components/MenuBody";
import "tailwindcss/tailwind.css";

function RestaurantsMenu() {
  return (
    <div className="ml-8">
      <Navbar />
      <NavMenu />
      <MenuBody />
    </div>
  );
}

export default RestaurantsMenu;
