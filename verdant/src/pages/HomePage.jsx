import React from "react";
import ArticleCard from "../components/ArticleCard";

function HomePage() {
  return (
    <div>
      <div className=" bg-[url('https://images.unsplash.com/photo-1586193427383-0befdb47bc7b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover  bg-center pb-25 md:pb-50 lg:pb-75 pt-6 flex flex-col items-center justify-center">
        <h1 className=" text-white text-1xl md:text-2xl lg:text-3xl font-bold">
          Welcome to the Agriverse, Jacob
        </h1>
        <p className=" text-white  text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
          sed do eiusmod tempor incididun
        </p>
      </div>
      <h3 className="text-center font-medium text-2xl">Popular Articles</h3>
      <div className="grid md:grid-cols-3 gap-2.5 place-content-center md:place-content-center ">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
}

export default HomePage;
