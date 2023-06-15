import React from "react";

function MenuCategories({ menu }) {
  return (
    <div className="flex flex-wrap">
      <div className="w-full font-bold text-4xl mb-7 ml-10 mt-10">Explore by category</div>
      {menu.map((value) => (
        <div className="w-1/5 px-5 mb-10 bg-gray-200 ml-10" key={value.id}>
          <div className="flex justify-center w-full mt-2">
            <div className="text-lg m-2">{value.menu}</div>
            <img src={value.photo} alt={value.menu} className=" w-20 h-20 text-sm ml-auto flex items-center justfy-center p-1"></img>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuCategories;
