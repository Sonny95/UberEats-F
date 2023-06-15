import React from "react";
import Logo from "../components/logo";
import facebook from "../../public/images/facebook_colour.png";
import apple from "../../public/images/apple.png";
import gitHub from "../../public/images/gitHub.png";
import axios from "axios";
import toast from "react-toastify";
import Image from "next/image";
import "tailwindcss/tailwind.css";

function EmailCheck() {
  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/register", data)
      .then((response) => {
        if (response.status === 409) {
          alert("Do you want to join us today?");
        } else if (response.status === 200) {
          alert("gv me password");
        }
        console.log(response, "??");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <div className="w-full h-20">
        <div className="absolute top-0 left-0 mt-8 ml-8 flex items-center ">
          <Logo />
        </div>
      </div>

      <div className="w-1/4 h-full absolute top-1/4 left-2/4 transform -translate-x-2/4">
        <div className="text-3xl">What's your phone number or email?</div>
        <input placeholder="Mobie number or email address" className="w-full h-12 mt-5 bg-gray-200"></input>
        <button className="cursor-pointer w-full h-12 bg-black rounded-lg text-white mt-5">Continue</button>
        <div className="w-full h-0.5 bg-gray-300 mt-5 mb-5"></div>
        <button className="cursor-pointer w-full h-12 bg-gray-200 rounded-lg">
          <Image src={gitHub} alt="gitHub" className="w-8 h-8 inline-block mr-4" />
          Continue with Github
        </button>
        <button className="cursor-pointer w-full h-12 bg-gray-200 rounded-lg mt-5">
          <Image src={apple} alt="apple" className="w-8 h-8 inline-block mr-4"></Image>Continue with Apple
        </button>
        <button className="cursor-pointer w-full h-12 bg-gray-200 rounded-lg mt-5 mb-5">
          <Image src={facebook} alt="facebook" className="w-8 h-8 inline-block mr-4"></Image>Continue with Facebook
        </button>
        <span className="text-xs">
          By proceeding, you agree to receive calls and WhatsApp or SMS messages from us and our affiliates at the number you have provided, including through
          auto-dial features.This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </span>
      </div>
    </div>
  );
}

export default EmailCheck;
