"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import facebook from "../../../public/images/facebook_colour.png";
import apple from "../../../public/images/apple.png";
import gitHub from "../../../public/images/gitHub.png";
import axios from "axios";
// import toast from "react-toastify";
import Image from "next/image";
import "tailwindcss/tailwind.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation"; // next/router 안됨 몰라 왜  app안인데?

function EmailCheck() {
  const [email, setEmail] = useState("");

  const formSchema = yup.object({
    email: yup
      .string()
      .required("Type your Email.")
      .email("It is not an email")
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
        "Type your Email."
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const onSubmit = (data) => {
    axios
      .get("http://localhost:8000/emailCheck", { params: { email: data.email } })
      .then((response) => {
        if (response.data.code === 409) {
          alert("Your Email is registered");
          setEmail(data.email);
          localStorage.setItem("email", data.email);
          router.push(`/loginPage?email=${data.email}`);
        } else if (response.data.code === 200) {
          alert("You can use Your Email");
          setEmail(data.email); // Save the email value in state
          localStorage.setItem("email", data.email); // Save the email value in local storage
          router.push(`/registerPage?email=${data.email}`); // Pass the email value as a query parameter
        }
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
        <div className="text-3xl">What's your email?</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            {...register("email")}
            placeholder="Mobie number or email address"
            className="w-full h-12 mt-5 bg-gray-200"
          ></input>
          {errors.email && <p>{errors.email.message}</p>}
          <button
            className="cursor-pointer w-full h-12 bg-black rounded-lg text-white mt-5"
            type="submit"
          >
            Continue
          </button>
        </form>

        <div className="w-full h-0.5 bg-gray-300 mt-5 mb-5"></div>

        <button className="cursor-pointer w-full h-12 bg-gray-200 rounded-lg">
          <Image src={gitHub} alt="gitHub" className="w-8 h-8 inline-block mr-4" />
          Continue with Github
        </button>
        <button className="cursor-pointer w-full h-12 bg-gray-200 rounded-lg mt-5">
          <Image src={apple} alt="apple" className="w-8 h-8 inline-block mr-4"></Image>Continue with
          Apple
        </button>
        <button className="cursor-pointer w-full h-12 bg-gray-200 rounded-lg mt-5 mb-5">
          <Image src={facebook} alt="facebook" className="w-8 h-8 inline-block mr-4"></Image>
          Continue with Facebook
        </button>
        <span className="text-xs">
          By proceeding, you agree to receive calls and WhatsApp or SMS messages from us and our
          affiliates at the number you have provided, including through auto-dial features.This site
          is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </span>
      </div>
    </div>
  );
}

export default EmailCheck;
