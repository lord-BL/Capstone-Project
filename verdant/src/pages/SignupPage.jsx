import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signUPWithEmailAndPassword } from "../../services/login.service";

const signupval = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

function SignupPage() {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupval),
  });

  const onSubmit = (data) => {
    console.log(data);
    signUPWithEmailAndPassword(signUpData.email, signUpData.password);
    setSignUpData({ email: "", password: "" });
    navigate("/home"); // Redirect to home page after validation is successful
  };

  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed brightness-90 contrast-90"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
      <div className="absolute top-1/2 right-5 left-25 transform -translate-y-2/4 w-[66%] h-[85%] bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-xl font-bold -mt-6 -ml-5">VERDANT</h1>
        <div className="flex justify-center flex-col items-center">
          <h2 className="mt-2 font-medium">Create Your Account</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <label htmlFor="fullname" className="pr-26 mt-5">
              Name
            </label>
            <input
              type="text"
              id="fullname"
              {...register("fullname")}
              placeholder="Enter Full Name"
              className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}

            <label htmlFor="email" className="pr-27">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email")}
              placeholder="Enter Email"
              className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({ ...signUpData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label htmlFor="password" className="pr-20">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <label htmlFor="confirmPassword" className="pr-20">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            <div className="mt-3">
              <Button label="Sign Up" type="submit" />
            </div>
          </form>
          <p className="pt-7">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
