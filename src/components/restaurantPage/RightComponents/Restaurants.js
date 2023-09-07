import React from "react";
import Link from "next/link";

function Restaurants({ foods }) {
  return (
    <div className="w-full">
      <div className="w-full font-bold text-4xl mb-7 ml-5 mt-10">Explore by category</div>
      <div className="flex flex-wrap">
        {foods.map((value) => (
          <div className="w-1/4 px-5 mb-10" key={value.id}>
            <Link href={`/restaurantDetail/${value.id}`}>
              <img src={value.photo} alt={value.foods} className="w-full h-36 rounded-2xl" />
              <div className="flex justify-center w-full mt-2">
                <div className="text-lg">{value.name}</div>
                <div className=" bg-gray-300 rounded-full w-7 h-7 text-sm ml-auto flex items-center justfy-center p-1">{value.review}</div>
              </div>
              <div className="flex justify-center w-full text-sm font-normal">
                <div className="">$ {value.deliveryFee} Delivery Fee^.</div>
                <div className="rounded-full ml-auto flex items-center justfy-center">{value.deliveryTime}min</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
