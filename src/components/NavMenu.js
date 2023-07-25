"use client";

import Image from "next/image";
import { React, useEffect, useState } from "react";
import axios from "axios";

function NavMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/menu")
      .then((response) => {
        setMenu(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="w-full h-40">
        <div className="flex flex-row">
          {menu.map((value) => (
            <div key={value.menu} className="flex flex-col items-center mr-auto px-5 mb-10">
              <img src={value.photo} alt={value.menu} className="w-full h-20 text-sm p-1 object-cover" />
              <div className="mt-2 text-center">{value.menu}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavMenu;
