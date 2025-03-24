import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function SignupPage() {
  return (
    <div className="relative w-screen h-screen ">
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
          <label htmlFor="fullname" className="pr-26 mt-5">
            Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter Full Name"
            className="border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
          />
          <label htmlFor="email" className="pr-27 ">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
          />
          <label htmlFor="fullname" className="pr-20 ">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
          />
          <label htmlFor="fullname" className="pr-20 ">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="border border-gray-500 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1 shadow-md"
          />
          <div className="mt-3">
            <Link to="/home">
              <Button label="Sign Up" />
            </Link>
          </div>
          <p className="pt-7">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
