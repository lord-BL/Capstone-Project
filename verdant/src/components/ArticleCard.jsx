import React from "react";

function ArticleCard({ title, author, image }) {
  return (
    <>
      <div className="w-72 h-full rounded-lg bg-white border-gray-200 shadow-lg  m-1">
        <img
          className="w-full h-32 object-cover"
          src={image}
          alt="Article Image"
        />

        <div className="p-0.5 h-30 overflow-clipped">
          <p className="text-gray-700 text-sm">{title}</p>
          <p className="mt-11 pl-10 font-semibold text-gray-900 ">{author}</p>
        </div>
      </div>
    </>
  );
}

export default ArticleCard;
