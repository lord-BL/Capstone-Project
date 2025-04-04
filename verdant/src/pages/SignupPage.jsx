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
    fullname: "",
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
    localStorage.setItem(
      "userData",
      JSON.stringify({
        fullname: signUpData.fullname,
        email: signUpData.email,
      })
    );
    setSignUpData({ fullname: "", email: "", password: "" });
    navigate("/home"); // Redirect to home page after validation is successful
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed brightness-90 contrast-90"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      {/* Signup container - adjusted for responsive design */}
      <div className="absolute flex flex-col items-center justify-center inset-0">
        <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-md mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">VERDANT</h1>

          <div className="flex flex-col items-center w-full">
            <h2 className="text-lg md:text-xl font-medium mt-4 mb-6">
              Create Your Account
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full max-w-sm"
            >
              <div className="mb-4 w-full">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  {...register("fullname")}
                  placeholder="Enter Full Name"
                  className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2 shadow-md"
                  value={signUpData.fullname}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, fullname: e.target.value })
                  }
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="mb-4 w-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  placeholder="Enter Email"
                  className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2 shadow-md"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4 w-full">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2 shadow-md"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, password: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mb-6 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className="border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2 shadow-md"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center mb-4">
                <Button label="Sign Up" type="submit" />
              </div>
            </form>

            <p className="mt-4 text-center text-sm md:text-base">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
