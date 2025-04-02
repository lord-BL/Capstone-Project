import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ForumPage from "./pages/ForumPage";
import ArticlePage from "./pages/ArticlePage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import ArticleDetails from "./pages/ArticleDetails";
function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}
function MainContent() {
  const location = useLocation();
  const hideNavbarPages = ["/login", "/signup"];

  return (
    <>
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/article-details" element={<ArticleDetails />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
