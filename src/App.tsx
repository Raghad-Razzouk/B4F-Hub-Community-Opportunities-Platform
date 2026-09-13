import { useState, useEffect } from "react";
import { Post, PostCategory ,  PostCategoryFilter} from "./types";
import { fetchPosts, createPost, toggleLikePost } from "./api";
import PostForm from "./components/PostForm";
import PostItem from "./components/PostItem";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter , setCategoryFilter] = useState<PostCategoryFilter>("all");
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
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <div className="app-container">
      <h1>B4F Hub</h1>

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
        <>
          <PostForm onPostCreated={handleNewPostCreation} />
          <div className="posts-feed">
            <h2>Community Feed ({posts.length})</h2>
            {posts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
          <p>{posts.length} posts successfully loaded !</p>
        </>
      )}
    </div>
  );
}

export default App;
