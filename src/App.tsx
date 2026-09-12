import { useState, useEffect } from "react";
import { Post } from "./types";
import { fetchPosts } from "./api";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setLoading] = useState<boolean>(true);
  const [iserror, setError] = useState<boolean>(false);
  
  async function loadPosts()
  {
    setLoading(true);
    setError(false)
    try {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
   
  }

  useEffect(()=>{
    loadPosts();
  } , [])
  return(
      <>
      {isloading && <p className="message">Loading the community feed...</p>}
      {!isloading && iserror && (<div className="message error">
            <p>
             We could not load the community feed. Please check your connection and try again.
            </p>
            <button className="retry-button" onClick={loadPosts}>
              Retry
            </button>
          </div>
          
        )}
        {!isloading && !iserror && (
        <div className="app-container">
          <h1>B4F Hub</h1>
          <p>{posts.length} posts successfully loaded !.</p>
        </div>
      )}
      </>
  );
}

export default App;
