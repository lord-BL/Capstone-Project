import React from "react";

function ArticleCard() {
  return (
    <>
      <div className="w-40 h-auto rounded-lg bg-white border-gray-200 shadow-lg overflow-hidden mt-3 ml-1">
        <img
          className="w-full h-25 object-cover"
          src="https://plus.unsplash.com/premium_photo-1661774568005-652b500dbfdb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />

        <div className="p-0.5 h-30">
          <p className="text-gray-700 text-sm">Maize Production in Ghana</p>
          <p className="mt-11 pl-10 font-semibold text-gray-900 ">Jacob H</p>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
