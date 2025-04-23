import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import {
  FiTrendingUp,
  FiClock,
  FiStar,
  FiFilter,
  FiChevronRight,
} from "react-icons/fi";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../config/firebase"; // Make sure you have your Firebase config file

const ArticlePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // State for articles
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  // For News API
  const newsApiQuery =
    'agriculture OR farming OR crops OR agribusiness OR "food security" OR "sustainable farming" OR "agricultural technology"';
  const pageSize = 20;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${newsApiQuery}&pageSize=${pageSize}&sortBy=relevancy&apiKey=${apiKey}`;

  // Function to fetch articles from Firebase
  const fetchFirebaseArticles = async () => {
    setLoading(true);
    try {
      // Fetch recommended articles
      const recommendedQuery = query(
        collection(db, "articles"),
        orderBy("recommendationScore", "desc"),
        limit(3)
      );
      const recommendedSnapshot = await getDocs(recommendedQuery);
      const recommendedData = recommendedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecommendedArticles(recommendedData);

      // Fetch popular articles
      const popularQuery = query(
        collection(db, "articles"),
        orderBy("viewCount", "desc"),
        limit(3)
      );
      const popularSnapshot = await getDocs(popularQuery);
      const popularData = popularSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPopularArticles(popularData);

      // Fetch recent articles
      const recentQuery = query(
        collection(db, "articles"),
        orderBy("publishedAt", "desc"),
        limit(3)
      );
      const recentSnapshot = await getDocs(recentQuery);
      const recentData = recentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecentArticles(recentData);

      // Store all articles for search functionality
      const allFirebaseArticles = [
        ...recommendedData,
        ...popularData,
        ...recentData,
      ].filter(
        (article, index, self) =>
          index === self.findIndex((a) => a.id === article.id)
      );
      setAllArticles(allFirebaseArticles);
    } catch (error) {
      console.error("Error fetching articles from Firebase:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to check if an article is agriculture-related
  const isAgricultureRelated = (article) => {
    const agKeywords = [
      "agriculture",
      "farming",
      "crops",
      "farm",
      "harvest",
      "livestock",
      "sustainable",
      "organic",
      "agri",
      "soil",
      "maize",
      "wheat",
      "rice",
      "food security",
      "agribusiness",
      "agro",
      "yield",
    ];

    const titleLower = article.title?.toLowerCase() || "";
    const descLower = article.description?.toLowerCase() || "";

    return agKeywords.some(
      (keyword) => titleLower.includes(keyword) || descLower.includes(keyword)
    );
  };

  // Function to fetch articles from News API
  const fetchNewsApiArticles = async (searchTerm = "") => {
    setLoading(true);
    try {
      const searchUrl = searchTerm
        ? `https://newsapi.org/v2/everything?q=${searchTerm} AND (${newsApiQuery})&pageSize=${pageSize}&sortBy=relevancy&apiKey=${apiKey}`
        : url;

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        const agArticles = data.articles.filter(isAgricultureRelated);
        return agArticles;
      } else {
        console.error("No articles found:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles from News API:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const newsApiResults = await fetchNewsApiArticles(searchTerm);

    // Search in Firebase articles as well
    const firebaseResults = allArticles.filter((article) => {
      const titleMatch = article.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = article.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      return titleMatch || descriptionMatch;
    });

    //Combine results
    const combinedResults = [...firebaseResults, ...newsApiResults];
    setSearchResults(combinedResults);

    // For now, only using News API results as specified
    setSearchResults(newsApiResults);
  };

  // Initial data fetch
  useEffect(() => {
    fetchFirebaseArticles();
  }, []);

  // Function to render article card
  const renderArticleCard = (article) => (
    <ArticleCard
      key={article.id}
      title={article.title}
      author={
        article.author
          ? `By ${article.author} • ${new Date(
              article.publishedAt
            ).toLocaleDateString()}`
          : ""
      }
      image={
        article.urlToImage || article.imageURL || `/api/placeholder/400/240`
      }
      article={article}
    />
  );

  // Function to render article list item
  const renderArticleListItem = (article) => (
    <div
      key={article.id}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 flex"
    >
      <img
        src={
          article.urlToImage || article.imageURL || `/api/placeholder/400/240`
        }
        alt={article.title}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="ml-4">
        <h3 className="font-medium text-gray-800 text-base line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-xs mt-1">
          {article.author
            ? `By ${article.author} • ${new Date(
                article.publishedAt
              ).toLocaleDateString()}`
            : ""}
        </p>
        <button className="text-xs text-blue-500 hover:underline mt-2">
          Read more...
        </button>
      </div>
    </div>
  );

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

        {/* Search Bar */}
        <div className="mb-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Search Results */}
        {isSearching && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results
              </h2>
            </div>

            {searchResults.length > 0 ? (
              <div className="flex flex-wrap justify-center">
                {searchResults.slice(0, 6).map(renderArticleCard)}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No results found. Try another search term.
                </p>
              </div>
            )}
          </section>
        )}

        {!isSearching && (
          <>
            {/* Recommended Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FiStar className="mr-2 text-yellow-500" /> Recommended For
                  You
                </h2>
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 font-medium flex items-center"
                >
                  View All <FiChevronRight className="ml-1" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center">
                {loading ? (
                  <p>Loading recommended articles...</p>
                ) : recommendedArticles.length > 0 ? (
                  recommendedArticles.map(renderArticleCard)
                ) : (
                  <p>No recommended articles found.</p>
                )}
              </div>
            </section>

            {/* Two Column Layout for Popular and Recent */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Popular Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FiTrendingUp className="mr-2 text-red-500" /> Popular
                    Articles
                  </h2>
                  <a
                    href="#"
                    className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
                  >
                    More <FiChevronRight className="ml-1" />
                  </a>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <p>Loading popular articles...</p>
                  ) : popularArticles.length > 0 ? (
                    popularArticles.map(renderArticleListItem)
                  ) : (
                    <p>No popular articles found.</p>
                  )}
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
                  {loading ? (
                    <p>Loading recent articles...</p>
                  ) : recentArticles.length > 0 ? (
                    recentArticles.map(renderArticleListItem)
                  ) : (
                    <p>No recent articles found.</p>
                  )}
                </div>
              </section>
            </div>
          </>
        )}

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
