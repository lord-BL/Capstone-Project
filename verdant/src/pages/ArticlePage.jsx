import React, { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import Button from "../components/Button";
import {
  FiTrendingUp,
  FiClock,
  FiStar,
  FiFilter,
  FiChevronRight,
} from "react-icons/fi";
import { GiWheat, GiCorn, GiFruitBowl, GiCow } from "react-icons/gi";

const ArticlePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock data - replace with your actual data
  const categories = [
    { id: "all", name: "All", icon: <GiWheat /> },
    { id: "crops", name: "Crops", icon: <GiCorn /> },
    { id: "livestock", name: "Livestock", icon: <GiCow /> },
    { id: "market", name: "Market", icon: <GiFruitBowl /> },
  ];

  // Mock articles for demonstration - replace with your actual data
  const mockArticles = {
    recommended: Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `rec-${i}`,
        title: `Recommended Article ${i + 1}`,
        author: "By John Doe • April 1, 2025",
        image: `/api/placeholder/400/240`,
      })),
    popular: Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `pop-${i}`,
        title: `Popular Article ${i + 1}`,
        author: "By Jane Smith • March 28, 2025",
        image: `/api/placeholder/400/240`,
      })),
    recent: Array(3)
      .fill(null)
      .map((_, i) => ({
        id: `rec-${i}`,
        title: `Recent Article ${i + 1}`,
        author: "By Mark Johnson • March 30, 2025",
        image: `/api/placeholder/400/240`,
      })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content area */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section with Featured Article */}
        <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-green-800 to-green-600 shadow-lg">
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(/api/placeholder/1200/400)` }}
          ></div>
          <div className="relative p-8 md:p-12 flex flex-col items-start">
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
              FEATURED
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Spring Planting Season: What Farmers Need to Know
            </h1>
            <p className="text-gray-100 mb-6 max-w-2xl">
              The latest agricultural research reveals new techniques for
              maximizing yield while conserving resources. Learn how these
              methods can transform your farm.
            </p>
            <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition flex items-center">
              Read Full Story <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center overflow-x-auto pb-4 mb-6 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center px-4 py-2 mr-3 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
          <button className="flex items-center px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50">
            <FiFilter className="mr-2" /> Filter
          </button>
        </div>

        {/* Recommended Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiStar className="mr-2 text-yellow-500" /> Recommended For You
            </h2>
            <a
              href="#"
              className="text-green-600 hover:text-green-700 font-medium flex items-center"
            >
              View All <FiChevronRight className="ml-1" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center">
            {mockArticles.recommended.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                author={article.author}
                image={article.image}
                article={article}
              />
            ))}
          </div>
        </section>

        {/* Two Column Layout for Popular and Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiTrendingUp className="mr-2 text-red-500" /> Popular Articles
              </h2>
              <a
                href="#"
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
              >
                More <FiChevronRight className="ml-1" />
              </a>
            </div>

            {/* Custom list layout for Popular/Recent sections */}
            <div className="space-y-4">
              {mockArticles.popular.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800 text-base line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {article.author}
                    </p>
                    <button className="text-xs text-blue-500 hover:underline mt-2">
                      Read more...
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiClock className="mr-2 text-blue-500" /> Recent Updates
              </h2>
              <a
                href="#"
                className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
              >
                More <FiChevronRight className="ml-1" />
              </a>
            </div>

            <div className="space-y-4">
              {mockArticles.recent.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800 text-base line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {article.author}
                    </p>
                    <button className="text-xs text-blue-500 hover:underline mt-2">
                      Read more...
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Newsletter Sign-up */}
        <section className="mt-12 bg-gradient-to-r from-green-700 to-green-600 rounded-xl p-8 text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Stay Updated with Agricultural News
            </h2>
            <p className="mb-6 text-green-100">
              Get the latest farming tips, market trends, and agricultural
              innovations directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 sm:w-72"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArticlePage;
