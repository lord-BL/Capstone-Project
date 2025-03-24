import React from "react";
import { Link } from "react-router-dom";
function ArticlePage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      {/* Hero Image */}
      <div className="w-full h-48 md:h-80 bg-gray-300">
        {/* Image goes here */}
      </div>

      {/* Article Content */}
      <h1 className="text-2xl md:text-4xl font-bold mt-4">Article Title</h1>
      <p className="text-gray-600 text-sm md:text-base mt-2">
        By Author Name | Date | 5 min read
      </p>

      <div className="mt-4 text-gray-800 text-sm md:text-lg leading-relaxed">
        <p>First paragraph of the article introducing the topic.</p>
        <h2 className="font-semibold mt-6">Subheading</h2>
        <p>Detailed content of the article goes here...</p>
      </div>

      {/* Related Articles */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Related Articles</h3>
        <ul className="mt-2 text-blue-600">
          <li>
            <Link to="/article/1">• Another interesting article</Link>
          </li>
          <li>
            <Link to="/article/2">• Learn more about farming trends</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ArticlePage;
