import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";

function HomePage() {
  // Enhanced query with specific agricultural terms
  const query =
    'agriculture OR farming OR crops OR agribusiness OR "food security" OR "sustainable farming" OR "agricultural technology"';
  const pageSize = 20;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&sortBy=relevancy&apiKey=${apiKey}`;

  const [allArticles, setAllArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all"); // Filter options: all, news, forum

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

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        // Store all articles for search functionality
        const agArticles = data.articles.filter(isAgricultureRelated);
        setAllArticles(agArticles);

        // Set the popular articles (static section)
        setPopularArticles(agArticles.slice(0, 6));
      } else {
        console.error("No articles found:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Mock forum posts (replace with your actual forum posts data)
  const forumPosts = [
    {
      id: 1,
      title: "Best practices for organic farming",
      author: "FarmerJoe",
      type: "forum",
    },
    {
      id: 2,
      title: "Dealing with drought conditions",
      author: "AgroPro",
      type: "forum",
    },
    {
      id: 3,
      title: "New irrigation technologies",
      author: "WaterWise",
      type: "forum",
    },
    {
      id: 4,
      title: "Sustainable pest management",
      author: "EcoFarmer",
      type: "forum",
    },
  ];

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const searchTermLower = searchTerm.toLowerCase();

    // Search in articles
    const matchingArticles = allArticles
      .filter((article) => {
        const titleLower = article.title?.toLowerCase() || "";
        const descLower = article.description?.toLowerCase() || "";
        return (
          titleLower.includes(searchTermLower) ||
          descLower.includes(searchTermLower)
        );
      })
      .map((article) => ({ ...article, type: "news" }));

    // Search in forum posts
    const matchingPosts = forumPosts.filter((post) => {
      const titleLower = post.title.toLowerCase();
      return titleLower.includes(searchTermLower);
    });

    // Combine and set search results
    const combinedResults = [...matchingArticles, ...matchingPosts];
    setSearchResults(combinedResults);
  };

  // Filter search results based on active filter
  const filteredResults =
    activeFilter === "all"
      ? searchResults
      : searchResults.filter((item) => item.type === activeFilter);

  return (
    <div>
      <div
        className="bg-[url('https://images.unsplash.com/photo-1586193427383-0befdb47bc7b?q=80&w=1470&auto=format&fit=crop')] 
                    bg-cover bg-center pb-25 md:pb-50 lg:pb-75 pt-6 flex flex-col items-center justify-center"
      >
        <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold">
          Welcome to the Agriverse
        </h1>
        <p className="text-white text-center">
          Discover the latest agricultural trends and insights.
        </p>
      </div>

      {/* Search and filter section */}
      <div className="pt-3 justify-center items-center flex flex-col">
        <SearchBar placeholder="Enter Your Search..." onSearch={handleSearch} />

        {isSearching && (
          <div className="flex space-x-4 mt-3">
            <button
              className={`px-3 py-1 rounded ${
                activeFilter === "all"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveFilter("all")}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded ${
                activeFilter === "news"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveFilter("news")}
            >
              News
            </button>
            <button
              className={`px-3 py-1 rounded ${
                activeFilter === "forum"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveFilter("forum")}
            >
              Forum
            </button>
          </div>
        )}
      </div>

      {/* Search Results Section (only shows when searching) */}
      {isSearching && (
        <div className="mt-5">
          <h3 className="text-center font-medium text-2xl mb-5">
            Search Results
          </h3>

          {loading ? (
            <div className="text-center">Loading results...</div>
          ) : filteredResults.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-2.5 place-content-center">
              {filteredResults.map((article, index) =>
                article.type === "news" ? (
                  <ArticleCard
                    key={`search-${index}`}
                    title={article.title}
                    article={article}
                    author={article.author || "Unknown"}
                    image={
                      article.urlToImage ||
                      "https://via.placeholder.com/300x200?text=Agriculture+News"
                    }
                  />
                ) : (
                  <div
                    key={`forum-${article.id}`}
                    className="border p-3 rounded-lg"
                  >
                    <h4 className="font-bold">{article.title}</h4>
                    <p className="text-sm text-gray-600">
                      By: {article.author}
                    </p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                      Forum Post
                    </span>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center">
              No results found. Try different keywords.
            </div>
          )}
        </div>
      )}

      {/* Popular Articles Section (always visible) */}
      <div className={`mt-5 ${isSearching ? "pt-8 border-t" : ""}`}>
        <h3 className="text-center font-medium text-2xl my-5">
          Popular Articles
        </h3>

        {loading ? (
          <div className="text-center">Loading articles...</div>
        ) : popularArticles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-2.5 place-content-center">
            {popularArticles.map((article, index) => (
              <ArticleCard
                key={`popular-${index}`}
                title={article.title}
                author={article.author || "Unknown"}
                article={article}
                image={
                  article.urlToImage ||
                  "https://via.placeholder.com/300x200?text=Agriculture+News"
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center">No popular articles found.</div>
        )}
      </div>

      {/* Popular Discussions Section */}
      <div className="m-3 mt-8">
        <h2 className="text-center font-bold text-2xl mb-5">
          Popular Discussions
        </h2>

        <div className="grid md:grid-cols-3 gap-2.5 place-content-center">
          {forumPosts.map((post) => (
            <div key={`forum-${post.id}`} className="border p-3 rounded-lg">
              <h4 className="font-bold">{post.title}</h4>
              <p className="text-sm text-gray-600">By: {post.author}</p>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                Forum Post
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
