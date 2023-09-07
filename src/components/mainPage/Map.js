"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function Map() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cities")
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="ml-8 mt-20 mr-8 h-1/2">
      <div className="font-bold text-5xl inline-block">Cities near me</div>
      <div className="inline-block float-right underline cursor-pointer mt-5">
        View all 500+ cities
      </div>
      <div>
        <iframe
          className="w-full mt-10 h-full mb-10"
          src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          title="Google map"
        ></iframe>
      </div>
      {cities.map((value) => (
        <div className="inline-block mt-10 w-1/4">
          <div key={value.id} className="mr-8 cursor-pointer">
            {value.cities}
          </div>
        </div>
      ))}

      <div className="w-full bg-gray-300 h-0.5 mt-16 mb-16"></div>
    </div>
  );
}

export default Map;
