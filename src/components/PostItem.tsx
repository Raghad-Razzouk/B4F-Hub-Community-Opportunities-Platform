import { Post } from "../types";

interface PostItemProps {
  post: Post;
  onLikeToggle: (postId: string, currentLikes: number, currentIsLiked?: boolean) => void;
}

 function PostItem({ post, onLikeToggle }: PostItemProps) {
  return (
    <div className="post-card">
      <div className="post-header">
        <span className="post-author">{post.author}</span>
        <span className="post-category-badge">{post.category}</span>
      </div>
      
      <p className="post-content">{post.content}</p>
      
      <div className="post-footer">
        <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
        
       
        <button 
          className={`like-btn ${post.liked ? "liked" : ""}`}
          onClick={() => onLikeToggle(post.id, post.likes, post.liked)}
        >
          {post.liked ? "💜" : "♡"} {post.likes}
        </button>
      </div>
    </div>
  );
}

export default PostItem;