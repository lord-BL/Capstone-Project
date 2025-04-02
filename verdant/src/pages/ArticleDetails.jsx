import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ArticleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};

  // Handle case where article data isn't available
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/home")}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="mb-4 text-green-600 hover:underline"
        onClick={() => navigate("/home")}
      >
        ← Back to Home
      </button>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-auto max-h-96 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>

      <div className="flex items-center text-gray-600 mb-6">
        <p className="mr-4">By: {article.author || "Unknown Author"}</p>
        {article.publishedAt && (
          <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
        )}
      </div>

      {article.description && (
        <p className="text-xl mb-4 font-semibold">{article.description}</p>
      )}

      {article.content ? (
        <div className="prose max-w-none">
          <p>{article.content}</p>

          {article.url && (
            <p className="mt-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read the full article on the original source
              </a>
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <p>No content available for this article.</p>
          {article.url && (
            <p className="mt-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Read the full article on the original source
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
