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
        navigate("/home");
        setloginData({ email: "", password: "" });
      })
      .catch((error) => {
        console.error("Login failed:", error.code);

        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("Incorrect email or password.");
        } else if (error.code === "auth/invalid-email") {
          alert("Invalid email format.");
        } else {
          alert("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="bg-green-700 hidden lg:block"></div>

      <div className="bg-white flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl lg:text-3xl font-bold text-green-700">
            VERDANT
          </h1>
          <h2 className="text-xl lg:text-2xl font-semibold mt-4">Sign In</h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={logindata.email}
                onChange={(e) =>
                  setloginData({ ...logindata, email: e.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full border border-green-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={logindata.password}
                onChange={(e) =>
                  setloginData({ ...logindata, password: e.target.value })
                }
              />
            </div>

            <div className="pt-2">
              <Button label="Sign In" type="submit" />
            </div>
          </form>

          <div className="mt-6">
            <p className="font-semibold text-sm">Forgot Password?</p>
            <p className="text-xs mt-2">
              Not yet a member?{" "}
              <Link to="/signup" className="text-green-600 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
