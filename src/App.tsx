import { useState, useEffect } from "react";
import { Post, PostCategory, PostCategoryFilter } from "./types";
import { fetchPosts, createPost, toggleLikePost } from "./api";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";
import CommunityFilters from "./components/CommunityFilters";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<PostCategoryFilter>("all");

  const filteredPosts = posts.filter((post) => {
  const matchesCategory =
    categoryFilter === "all" ||
    post.category === categoryFilter;

  const matchesSearch =
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase());

  return matchesCategory && matchesSearch;
});

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError(
        "We could not load the community feed. Please check your connection and try again.",
      );
      setLoading(false);
    }
  }
  async function handleLikeToggle(
    postId: string,
    currentLikes: number,
    currentIsLiked?: boolean,
  ) {
    const newIsLiked = !currentIsLiked;
    const newLikes = newIsLiked ? currentLikes + 1 : currentLikes - 1;

    try {
      const updatedPost = await toggleLikePost(postId, newLikes, newIsLiked);

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? updatedPost : post)),
      );
    } catch (error) {
      setError("Failed to update like. Please try again.");
    }
  }

  async function handleNewPostCreation(newPostData: {
    content: string;
    category: PostCategory;
  }) {
    try {
      setError(null);
      const createdPost = await createPost(newPostData);
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
    } catch (error) {
      setError("Failed to publish the post; please try again.");
    }
  }
  function handleCategoryChange(category: PostCategoryFilter) {
    setCategoryFilter(category);
    setSearchTerm("");
  }
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        {isloading && <p className="message">Loading the community feed...</p>}

        {!isloading && error && (
          <div className="message error">
            <p>{error}</p>

            <button className="retry-button" onClick={loadPosts}>
              Retry
            </button>
          </div>
        )}

        {!isloading && !error && (
          <section className="community-section">
            <h2>Community</h2>

            <PostForm onPostCreated={handleNewPostCreation} />

            <div className="posts-feed">
              <CommunityFilters
                categoryFilter={categoryFilter}
                onCategoryChange={handleCategoryChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              <h3>
                {filteredPosts.length} of {posts.length} posts shown
              </h3>

              {filteredPosts.length === 0 ? (
                <p className="message"> No posts found for this category.</p>
              ) : (
                filteredPosts.map((post) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    onLikeToggle={handleLikeToggle}
                  />
                ))
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
