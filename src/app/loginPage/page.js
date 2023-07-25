"use client";

import Logo from "@/components/Logo";
import axios from "axios";
// import toast from "react-toastify";
import "tailwindcss/tailwind.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation"; // next/router 안됨 몰라 왜  app안인데?
import Cookies from "universal-cookie";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formSchema = yup.object({
    password: yup.string().required("Type your password.").min(1, "Minimum8"),
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
    const cookies = new Cookies();
    console.log(data, "login");

    const requestData = {
      email: email,
      password: data.password,
    };

    axios
      .post("http://localhost:8000/login", requestData)
      .then((response) => {
        console.log(response.data.code, "response.data.code");
        console.log(response.status, "response.status");
        if (response.data.code === 200) {
          alert("User Login successfully");
          cookies.set("token", response.data.token, {
            path: "/restaurant",
            domain: ".localhost",
            httpOnly: true,
          });
          console.log(response.data.token, "cookie로껒여");
          console.log(response.data, "????");
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
        <div className="text-3xl">Checking Password</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="password" {...register("password")} placeholder="Type your password" className="w-full h-12 mt-5 bg-gray-200"></input>
          {errors.password && <p>{errors.password.message}</p>}
          <button className="cursor-pointer w-full h-12 bg-black rounded-lg text-white mt-5" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
