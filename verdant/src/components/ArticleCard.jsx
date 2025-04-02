import React from "react";
import { useNavigate } from "react-router-dom";

function ArticleCard({ title, author, image, article }) {
  const navigate = useNavigate(); // Must be used at the component level, not inside a function

  const handleClick = () => {
    navigate("/article-details", { state: { article } });
  };

  return (
    <div className="w-72 h-96 rounded-lg bg-white border border-gray-200 shadow-md m-2 overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-102">
      <img
        className="w-full h-40 object-cover"
        src={image}
        alt="Article thumbnail"
      />
      <div className="p-4 flex flex-col justify-between h-56">
        <div className="overflow-hidden">
          <h3 className="font-medium text-gray-800 text-lg mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-4 mt-2 mb-4">
            {author}
          </p>
        </div>
        <div className="mt-auto">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={handleClick}
          >
            Read more...
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
