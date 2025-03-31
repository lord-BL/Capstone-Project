// forum.service.js - Create this file to handle forum data operations
import { db, auth } from "../src/config/firebase"; // Adjust path as needed
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";

// Get all forum posts
export const getAllPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to create a post");

    const postRef = await addDoc(collection(db, "posts"), {
      title: postData.title,
      content: postData.content,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous",
      authorEmail: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likes: [],
      comments: [],
      tags: postData.tags || [],
    });

    return postRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Toggle like on a post
export const toggleLike = async (postId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to like a post");

    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error("Post not found");
    }

    const postData = postSnap.data();
    const likes = postData.likes || [];

    if (likes.includes(user.uid)) {
      // Remove like
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
      return false; // Indicates post is now unliked
    } else {
      // Add like
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
      return true; // Indicates post is now liked
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// Add a comment to a post
export const addComment = async (postId, commentText) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to comment");

    const postRef = doc(db, "posts", postId);

    const comment = {
      id: Date.now().toString(), // Simple unique ID
      content: commentText,
      authorId: user.uid,
      authorName: user.displayName || "Anonymous",
      createdAt: Timestamp.now(),
    };

    await updateDoc(postRef, {
      comments: arrayUnion(comment),
      updatedAt: serverTimestamp(),
    });

    return comment;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Search posts by title or content
export const searchPosts = async (searchTerm) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a simple solution using client-side filtering
    // For production, consider Algolia or similar search service

    const posts = await getAllPosts();
    const searchTermLower = searchTerm.toLowerCase();

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTermLower) ||
        post.content.toLowerCase().includes(searchTermLower) ||
        (post.tags &&
          post.tags.some((tag) => tag.toLowerCase().includes(searchTermLower)))
      );
    });
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
};

// Save/unsave a post (bookmark)
export const toggleBookmark = async (postId) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to bookmark a post");

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create user document if it doesn't exist
      await setDoc(userRef, {
        email: user.email,
        bookmarks: [postId],
      });
      return true;
    }

    const userData = userSnap.data();
    const bookmarks = userData.bookmarks || [];

    if (bookmarks.includes(postId)) {
      // Remove bookmark
      await updateDoc(userRef, {
        bookmarks: arrayRemove(postId),
      });
      return false; // Indicates post is now unbookmarked
    } else {
      // Add bookmark
      await updateDoc(userRef, {
        bookmarks: arrayUnion(postId),
      });
      return true; // Indicates post is now bookmarked
    }
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    throw error;
  }
};

// Get a user's bookmarked posts
export const getBookmarkedPosts = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("You must be logged in to see bookmarks");

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return [];
    }

    const userData = userSnap.data();
    const bookmarks = userData.bookmarks || [];

    if (bookmarks.length === 0) {
      return [];
    }

    // Get the actual posts that are bookmarked
    const posts = [];
    for (const bookmarkId of bookmarks) {
      const postRef = doc(db, "posts", bookmarkId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        posts.push({
          id: postSnap.id,
          ...postSnap.data(),
        });
      }
    }

    return posts;
  } catch (error) {
    console.error("Error getting bookmarked posts:", error);
    throw error;
  }
};

// Get posts by specific tag
export const getPostsByTag = async (tag) => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("tags", "array-contains", tag),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return posts;
  } catch (error) {
    console.error("Error getting posts by tag:", error);
    throw error;
  }
};
