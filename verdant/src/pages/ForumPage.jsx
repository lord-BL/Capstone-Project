import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaThumbsUp,
  FaComment,
  FaBookmark,
  FaTag,
} from "react-icons/fa";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import { auth } from "../../src/config/firebase"; // Adjust path as needed
import {
  getAllPosts,
  createPost,
  toggleLike,
  addComment,
  toggleBookmark,
  searchPosts,
} from "../../services/forum.service";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const ForumPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Form states
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "" });
  const [commentText, setCommentText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch posts
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle new post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please sign in to create a post");
      navigate("/login");
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please enter both title and content for your post");
      return;
    }

    try {
      setLoading(true);

      // Convert comma-separated tags to array
      const tagsArray = newPost.tags
        ? newPost.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      await createPost({
        title: newPost.title,
        content: newPost.content,
        tags: tagsArray,
      });

      // Reset form
      setNewPost({ title: "", content: "", tags: "" });

      // Refresh posts
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle like toggle
  const handleLikeToggle = async (postId) => {
    if (!user) {
      alert("Please sign in to like posts");
      navigate("/login");
      return;
    }

    try {
      await toggleLike(postId);

      // Update post in state
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            const userLiked = post.likes.includes(user.uid);
            return {
              ...post,
              likes: userLiked
                ? post.likes.filter((id) => id !== user.uid)
                : [...post.likes, user.uid],
            };
          }
          return post;
        })
      );
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // Handle comment toggle and submission
  const handleCommentToggle = (postId) => {
    setActiveCommentId(activeCommentId === postId ? null : postId);
    setCommentText("");
  };

  const handleCommentSubmit = async (postId) => {
    if (!user) {
      alert("Please sign in to comment");
      navigate("/login");
      return;
    }

    if (!commentText.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      const newComment = await addComment(postId, commentText);

      // Update post in state
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...(post.comments || []), newComment],
            };
          }
          return post;
        })
      );

      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = async (postId) => {
    if (!user) {
      alert("Please sign in to bookmark posts");
      navigate("/login");
      return;
    }

    try {
      await toggleBookmark(postId);
      // Note: We don't update UI here since bookmarks are stored in user document
      // You could fetch the user's bookmarks and update a local state if needed
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  // Handle search
  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      fetchPosts();
      return;
    }

    try {
      setLoading(true);
      const results = await searchPosts(term);
      setPosts(results);
    } catch (err) {
      console.error("Error searching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";

    try {
      const date =
        timestamp instanceof Timestamp
          ? timestamp.toDate()
          : new Date(timestamp);

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      console.error("Error formatting date:", err);
      return "Invalid date";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center min-h-auto p-4 bg-white">
      <div className="w-full lg:w-3/5 p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
          The Agriverse Community
        </h1>

        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar
            placeholder="Search for posts..."
            onSearch={handleSearch}
          />
        </div>

        {/* Post Input */}
        <form
          onSubmit={handlePostSubmit}
          className="p-4 border border-gray-300 rounded-md shadow-md mt-3"
        >
          <input
            type="text"
            placeholder="Title of Question or Post"
            className="w-full border border-gray-300 p-2 rounded-md mb-2"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            disabled={!user}
          />
          <textarea
            placeholder={
              user
                ? "Share your thoughts..."
                : "Please sign in to create a post"
            }
            className="w-full border border-gray-300 p-2 rounded-md h-24 mb-2"
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            disabled={!user}
          ></textarea>
          <input
            type="text"
            placeholder="Tags (comma separated, e.g., farming, organic, irrigation)"
            className="w-full border border-gray-300 p-2 rounded-md mb-2"
            value={newPost.tags}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
            disabled={!user}
          />
          <Button
            label={loading ? "Posting..." : "Post"}
            className="mt-2 w-full"
            disabled={loading || !user}
            type="submit"
          />
        </form>

        {/* Status Messages */}
        {loading && <p className="text-center my-4">Loading posts...</p>}
        {error && <p className="text-center text-red-500 my-4">{error}</p>}
        {!loading && posts.length === 0 && (
          <p className="text-center my-4">
            {searchTerm
              ? "No posts found matching your search."
              : "No posts yet. Be the first to post!"}
          </p>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="mt-6 p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <span className="text-xs text-gray-500">
                {formatDate(post.createdAt)}
              </span>
            </div>

            <p className="text-gray-700 mb-3">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center"
                  >
                    <FaTag className="mr-1" size={10} /> {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-600 mb-2">
              Posted by: {post.authorName || "Anonymous"}
            </div>

            <hr className="my-3" />

            <div className="flex justify-between items-center text-gray-600 text-lg py-1">
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <FaThumbsUp
                    className={`cursor-pointer hover:text-green-600 ${
                      user && post.likes && post.likes.includes(user.uid)
                        ? "text-green-600"
                        : ""
                    }`}
                    onClick={() => handleLikeToggle(post.id)}
                  />
                  {post.likes && (
                    <span className="text-sm ml-1">{post.likes.length}</span>
                  )}
                </div>

                <div className="flex items-center">
                  <FaComment
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => handleCommentToggle(post.id)}
                  />
                  {post.comments && (
                    <span className="text-sm ml-1">{post.comments.length}</span>
                  )}
                </div>
              </div>

              <FaBookmark
                className="cursor-pointer hover:text-yellow-600"
                onClick={() => handleBookmarkToggle(post.id)}
              />
            </div>

            {/* Comments Section */}
            {activeCommentId === post.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h4 className="font-medium mb-2">Comments</h4>

                {post.comments && post.comments.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-white p-2 rounded border"
                      >
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{comment.authorName}</span>
                          <span>{formatDate(comment.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-2">No comments yet</p>
                )}

                {/* Comment form */}
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 p-2 rounded-l-md"
                    placeholder={
                      user ? "Add a comment..." : "Sign in to comment"
                    }
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={!user}
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 disabled:bg-gray-400"
                    onClick={() => handleCommentSubmit(post.id)}
                    disabled={!user || !commentText.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar - You can add trending topics, user stats, etc. here */}
      <div className="w-full lg:w-1/4 p-4 mt-4 lg:mt-0 lg:ml-4 bg-white rounded-lg shadow-md hidden lg:block">
        <h3 className="font-bold text-lg mb-4">Trending Topics</h3>
        <ul className="space-y-2">
          <li className="p-2 bg-green-50 rounded">
            <span className="font-medium">#OrganicFarming</span>
          </li>
          <li className="p-2 bg-green-50 rounded">
            <span className="font-medium">#Irrigation</span>
          </li>
          <li className="p-2 bg-green-50 rounded">
            <span className="font-medium">#SustainableAgriculture</span>
          </li>
          <li className="p-2 bg-green-50 rounded">
            <span className="font-medium">#ClimateChange</span>
          </li>
        </ul>

        <h3 className="font-bold text-lg mt-6 mb-4">Forum Guidelines</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Be respectful and constructive</li>
          <li>Stay on topic with agriculture-related content</li>
          <li>Share your knowledge and experiences</li>
          <li>Cite sources when sharing information</li>
          <li>Ask questions clearly for better responses</li>
        </ul>
      </div>
    </div>
  );
};

export default ForumPage;
