import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../services/login.service";
function LoginPage() {
  const navigate = useNavigate();
  const [logindata, setloginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithEmailAndPassword(logindata.email, logindata.password)
      .then((user) => {
        console.log("Login successful, redirecting...");
        navigate("/home"); // Navigate to homepage after successful login
        setloginData({ email: "", password: "" });
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle login failure
      });
  };
  return (
    <div className="grid grid-cols-2">
      <div className="bg-green-700  h-screen">
        <p>This is this, haha</p>
      </div>
      <div className="bg-white m-1 ">
        <h1 className="pl-0.5 font-bold">VERDANT</h1>
        <h2 className="pl-10 mt-3 text-2xl">Sign In</h2>
        <div>
          <form onSubmit={handleSubmit} className="">
            <label htmlFor="email" className="p-1">
              Email
            </label>
            <p>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                className="border border-green-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500 w-36 pl-1 m-1"
                value={logindata.email}
                onChange={(e) =>
                  setloginData({ ...logindata, email: e.target.value })
                }
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
                value={logindata.password}
                onChange={(e) =>
                  setloginData({ ...logindata, password: e.target.value })
                }
              />
            </p>
            <div className="m-5 ">
              <Button label="Sign In" />
            </div>
          </form>
        </div>
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
