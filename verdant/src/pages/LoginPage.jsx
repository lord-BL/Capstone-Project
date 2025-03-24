import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <div className="grid grid-cols-2">
      <div className="bg-green-700  h-screen">
        <p>This is this, haha</p>
      </div>
      <div className="bg-white m-1 ">
        <h1 className="pl-0.5 font-bold">VERDANT</h1>
        <h2 className="pl-10 mt-3 text-2xl">Sign In</h2>
        <div>
          <form action="" className="">
            <label htmlFor="username" className="p-1">
              Username
            </label>
            <p>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                className="border border-green-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1"
              />
            </p>
            <label htmlFor="password" className="p-1">
              Password
            </label>
            <p>
              {" "}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="border border-green-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1"
              />
            </p>
          </form>
        </div>
        <div className="m-5 "></div>
        <Link to="/signup">
          {" "}
          <Button label="Sign In" />
        </Link>
        <div>
          <p className="font-bold mt-5">Forgot Password?</p>
          <p className="font-normal text-xs mt-4">
            Not yet a member?{" "}
            <Link to="/signup" className="font-normal text-green-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
