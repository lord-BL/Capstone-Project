import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ArticleCard from "../components/ArticleCard";

function ArticlePage() {
  return (
    <>
      <div className="max-w-3xl mx-auto p-4 md:p-8 flex justify-center">
        <SearchBar placeholder="Search for articles..." />
      </div>

      <h2 className="text-2xl font-semibold text-center mt-6">
        Recent Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-8 lg:px-16 mb-6">
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
      </div>

      <h2 className="text-2xl font-semibold text-center mt-6">
        Browse our Popular Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-8 lg:px-16 mb-6">
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
      </div>

      <h2 className="text-2xl font-semibold text-center mt-6">
        Recommended Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-8 lg:px-16 mb-6">
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
        <ArticleCard title="Lord of the Shadows" author="Nephis" />
      </div>
    </>
  );
}

export default ArticlePage;
