"use client";

import { useEffect } from "react";
import Logo from "@/components/Logo";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formSchema = yup.object({
    name: yup.string().required("Type your name."),
    phone: yup.string().required("Minimum 10.").min(1, "Type Minimum 10"),
    password: yup.string().required("Type your password.").min(1, "Minimum 8"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
  });

  const email = searchParams.get("email");
  console.log(email, "email");

  const onSubmit = (data) => {
    const requestData = {
      email: email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    };

    console.log(data, "register");
    axios
      .post("http://localhost:8000/register", requestData)
      .then((response) => {
        console.log(response.data.code, "response.data.code");
        console.log(response.status, "response.status");
        if (response.status === 200) {
          alert("User created successfully");
          router.push("/restaurant");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <div className="w-full h-20">
        <div className="absolute top-0 left-0 mt-8 ml-8 flex items-center">
          <Logo />
        </div>
      </div>

      <div className="w-1/4 h-full absolute top-1/4 left-2/4 transform -translate-x-2/4">
        <div className="text-3xl">New Register</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" {...register("name")} placeholder="Type your name" className="w-full h-12 mt-5 bg-gray-200"></input>
          {errors.name && <p>{errors.name.message}</p>}
          <input name="password" {...register("password")} placeholder="Type your password" className="w-full h-12 mt-5 bg-gray-200"></input>
          {errors.password && <p>{errors.password.message}</p>}
          <input name="phone" {...register("phone")} placeholder="Type your phone number" className="w-full h-12 mt-5 bg-gray-200"></input>
          {errors.phone && <p>{errors.phone.message}</p>}
          <button className="cursor-pointer w-full h-12 bg-black rounded-lg text-white mt-5" type="submit">
            Register
          </button>
        </form>

        <div className="w-full h-0.5 bg-gray-300 mt-5 mb-5"></div>

        <span className="text-xs">
          By proceeding, you agree to receive calls and WhatsApp or SMS messages from us and our affiliates at the number you have provided, including through
          auto-dial features.This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </span>
      </div>
    </div>
  );
}

export default RegisterPage;
