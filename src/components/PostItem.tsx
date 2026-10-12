import { Post } from "../types";

interface PostItemProps {
  post: Post;
  onLikeToggle: (id: string, currentLikes: number, currentIsLiked?: boolean) => Promise<void>;
}

function PostItem({ post, onLikeToggle }: PostItemProps) {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author-info">
          <div className="post-avatar">
            {post.author.substring(0, 2).toUpperCase()}
          </div>
          
          <div className="post-author-meta">
            <span className="post-author">{post.author}</span>
<span className="post-date">{post.createdAt.substring(0, 10)}</span>
          </div>
        </div>

        <span className="post-category-badge">{post.category}</span>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-footer">
        <button 
          className={`like-btn ${post.liked ? 'liked' : ''}`}
          onClick={() => onLikeToggle(post.id, post.likes, post.liked)}
        >
          {post.liked ? "❤️" : "🤍"} {post.likes} Likes
        </button>
      </div>
    </div>
  );
}

export default PostItem;
