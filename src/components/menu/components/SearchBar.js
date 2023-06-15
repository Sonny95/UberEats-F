import React from "react";
import magnifier from "../../../../public/images/magnifier.png";
import Image from "next/image";

function SearchBar(value, changeInput) {
  return (
    <div>
      <div className="w-1/2 h-12 bg-gray-200 rounded-full ml-10 flex items-center">
        <Image src={magnifier} className="w-6 h-6 ml-2" alt="magnifier"></Image>
        <input placeholder="Food,groceries,drink and etc" className="w-full h-12 bg-gray-200 rounded-full ml-10" value={value} onChange={changeInput}></input>
      </div>
    </div>
  );
}

export default SearchBar;
