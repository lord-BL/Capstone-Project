import React from "react";
import { Link } from "react-router-dom";

// This component now expects the full article object to be passed as a prop
function ArticleDetails({ article, onBackClick }) {
  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Article not found</h1>
        <p className="mt-4">The article details couldn't be displayed.</p>
        <button
          onClick={onBackClick}
          className="mt-8 inline-block text-blue-600 hover:text-blue-800"
        >
          Return to articles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={onBackClick}
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-6"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        Back to articles
      </button>

      {/* Article header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-4">By {article.author}</span>
          {article.date && (
            <>
              <span className="mr-4">•</span>
              <span className="mr-4">{article.date}</span>
            </>
          )}
          {article.readTime && (
            <>
              <span className="mr-4">•</span>
              <span>{article.readTime}</span>
            </>
          )}
        </div>
      </header>

      {/* Featured image */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-md">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Article content */}
      {article.content ? (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      ) : (
        <p className="text-lg text-gray-700">
          No additional content available for this article.
        </p>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-200">
          <h2 className="text-sm font-medium text-gray-600 mb-3">Topics</h2>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticleDetails;
