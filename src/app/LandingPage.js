import React from "react";
import MainImage from "../components/mainPage/Mainimg";
import Contents from "../components/mainPage/Contents";
import Map from "../components/mainPage/Map";
import Footer from "../components/mainPage/Footer";
import "tailwindcss/tailwind.css";

function LandingPage() {
  return (
    <div>
      <MainImage />
      <Contents />
      <Map />
      <Footer />
    </div>
  );
}

export default LandingPage;
