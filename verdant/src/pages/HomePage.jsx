import React, { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const query =
    "agriculture OR farming OR crops OR agribusiness OR food security";
  const pageSize = 10;
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      } else {
        console.error("No articles found:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
      <div className="pt-3 justify-center items-center flex">
        <SearchBar placeholder="Enter Your Search..." />
      </div>
      <h3 className="text-center font-medium text-2xl my-5">
        Popular Articles
      </h3>

      <div className="grid md:grid-cols-3 gap-2.5 place-content-center">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            author={article.author}
            image={article.urlToImage}
          />
        ))}
      </div>
      <div className="m-3">
        <h2 className="text-center font-bold text-2xl">Popular Discussions</h2>
      </div>
    </div>
  );
}

export default HomePage;
