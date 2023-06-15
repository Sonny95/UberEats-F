import React from "react";

function DietCheckBox() {
  return (
    <div>
      <div className="w-full h-1/5  mt-10 mb-10 text-lg flex flex-col">
        <div className="text-2xl">Dietary</div>
        <div className="flex flex-col mt-5">
          <button className="bg-gray-300 h-12 rounded-2xl p-1.5 w-2/4">Vegetarian</button>
        </div>
        <div className="flex flex-col mt-3">
          <button className="bg-gray-300 h-12 rounded-2xl mr-5 p-1.5 w-2/4">Vegan</button>
        </div>
        <div className="flex flex-col mt-3">
          <button className="bg-gray-300 h-12 rounded-2xl mr-5 p-1.5 w-2/4">Gluten-free</button>
        </div>
        <div className="flex flex-col mt-3">
          <button className="bg-gray-300 h-12 rounded-2xl mr-5 p-1.5 w-2/4">Halal</button>
        </div>
      </div>
    </div>
  );
}

export default DietCheckBox;
