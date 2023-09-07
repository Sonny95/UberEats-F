"use client";

import React from "react";
import Logo from "@/components/Logo";
import Cookies from "universal-cookie"; // universal-cookie 라이브러리 임포트
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/features/userSlice";

function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("token");
    dispatch(logoutAction());
    router.push("/restaurant");
  };

  return (
    <div>
      <div className="w-full h-20">
        <div className="absolute top-0 left-0 mt-8 ml-8 flex items-center ">
          <Logo />
        </div>
      </div>

      <div className="w-1/4 h-full absolute top-1/4 left-2/4 transform -translate-x-2/4">
        <div className="text-3xl">Are you sure you want to LOGOUT?</div>
        <button className="cursor-pointer w-full h-12 bg-black rounded-lg text-white mt-5" type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Logout;
