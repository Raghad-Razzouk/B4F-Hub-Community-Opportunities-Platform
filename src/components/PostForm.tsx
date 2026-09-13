import { useState, FormEvent, ChangeEvent } from "react";
import { PostCategory } from "../types";

interface PostFormProps {
  onPostCreated: (newPostData: {
    content: string;
    category: PostCategory;
  }) => void;
}

function PostForm({ onPostCreated }: PostFormProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<PostCategory>("community");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }
    if (content.trim().length < 3) {
      setError("Post must be at least 3 characters.");
      return;
    }
    setError("");
    onPostCreated({ content, category });
    setContent("");
    setCategory("community");
  }

  function handleContant(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value as PostCategory);
  }

  return (
    <>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder={`Share something with the ${category}...`}
          value={content}
          onChange={handleContant}
          rows={3}/>
        <div className="form-footer">
          <select
            className="category-select"
            value={category}
            onChange={handleCategoryChange}>
            <option value="community">Community</option>
            <option value="announcements">Announcements</option>
            <option value="events">Events</option>
            <option value="resources">Resources</option>
          </select>
          <button type="submit" className="submit-btn">
            Post
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </>
  );
}

export default PostForm;
