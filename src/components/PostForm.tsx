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

  const categories: PostCategory[] = [
    "community",
    "announcement",
    "event",
    "resource",
  ];

  const MIN_CHARS = 3;
  const MAX_CHARS = 400;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) {
      setError("Post content cannot be empty.");
      return;
    }
    if (content.trim().length < MIN_CHARS) {
      setError(`Post must be at least ${MIN_CHARS} characters.`);
      return;
    }
    if (content.length > MAX_CHARS) {
      setError(`Post is too long. Maximum allowed length is ${MAX_CHARS} characters.`);
      return;
    }
    if (!category) {
      setError("A category must be selected.");
      return;
    }
    
    setError("");
    onPostCreated({ content, category });
    setContent("");
    setCategory("community");
  }

  function handleContant(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value.length <= MAX_CHARS) {
      setContent(event.target.value);
    }
    
    if (!event.target.value) {
      setError("");
    }
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value as PostCategory);
  }

  return (
    <>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          className="post-textarea"
          placeholder={`Share something with the community...`}
          value={content}
          onChange={handleContant}
          rows={3}
          maxLength={MAX_CHARS}
        />

        <div className="char-counter">
          <span className={content.length >= MAX_CHARS ? "char-limit-reached" : ""}>
            {MAX_CHARS - content.length} characters left
          </span>
        </div>

        <div className="form-footer">
          <select
            className="category-select"
            value={category}
            onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={content.trim().length < MIN_CHARS}
          >
            Post
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </>
  );
}

export default PostForm;
