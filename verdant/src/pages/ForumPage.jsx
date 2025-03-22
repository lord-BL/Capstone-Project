import React from "react";

function ForumPage() {
  return (
    <div>
      ForumPage
      <div className="grid grid-cols-2">
        <div className="bg-green-800  h-100">
          <p>This is this, haha</p>
        </div>
        <div className="bg-white ">
          <h1 className="pl-0.5 font-bold">VERDANT</h1>
          <h2 className="pl-10 mt-3 text-2xl">Sign In</h2>
          <div>
            <label htmlFor="username">Username</label>
            <p>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                className="border border-green-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </p>
            <label htmlFor="password">Password</label>
            <p>
              {" "}
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="border border-green-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </p>
          </div>
          <div>
            <button className="bg-green-700 pt-1 pb-1.5 pl-7.5 pr-7.5 ml-10 mt-18 rounded-full text-white">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;
