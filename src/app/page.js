import Image from "next/image";
import React from "react";
import MainImage from "@/components/mainPage/Mainimg";
import Contents from "@/components/mainPage/Contents";
import Map from "@/components/mainPage/Map";
import Footer from "@/components/mainPage/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <MainImage />
      <Contents />
      <Map />
      <Footer />
    </div>
  );
}
