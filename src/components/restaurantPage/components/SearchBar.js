import React from "react";
import magnifier from "../../../../public/images/magnifier.png";
import Image from "next/image";

function SearchBar() {
  return (
    <div>
      <div className="w-full h-12 bg-gray-200 rounded-full ml-10 flex items-center">
        <Image src={magnifier} className="w-6 h-6 ml-2" alt="magnifier"></Image>
        <input placeholder="Food,groceries,drink and etc" className="w-full h-12 bg-gray-200 rounded-full ml-4"></input>
      </div>
    </div>
  );
}

export default SearchBar;
