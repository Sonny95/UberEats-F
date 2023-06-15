import React from "react";
import SortCheckBox from "./SortCheckBox";
import FromCheckBox from "./FromCheckBox";
import PriceCheckBox from "./PriceCheckBox";
import DietCheckBox from "./DietCheckBox";

function LeftCategories() {
  return (
    <div>
      <div className="left-0 w-full h-1/2 flaot-left ">
        <div className="text-3xl">All stores</div>

        <SortCheckBox />

        <FromCheckBox />

        <PriceCheckBox />

        <DietCheckBox />
      </div>
    </div>
  );
}

export default LeftCategories;
