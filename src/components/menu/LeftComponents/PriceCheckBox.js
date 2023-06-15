import React from "react";

function PriceCheckBox() {
  return (
    <div>
      <div className="w-full h-1/5  mt-10 mb-10 text-lg flex flex-col">
        <div className="text-2xl">Price Range</div>
        <div className="flex items-center mt-5">
          {[0, 1, 2, 3].map((index) => (
            <button key={index} className="bg-gray-300 h-12 w-auto rounded-2xl mr-3 p-3 text-sm">
              {Array(index + 1)
                .fill("$")
                .join("")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceCheckBox;
