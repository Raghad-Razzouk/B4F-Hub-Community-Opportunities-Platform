import { Post, PostCategory } from "./types";
const API_POST = "/api/posts";

export async function fetchPosts() {
  const response = await fetch(API_POST);
  const posts = (await response.json()) as Post[];

  return posts;
}

export async function createPost(newPostData: {
  content: string;
  category: PostCategory;
}) {
  const response = await fetch(API_POST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostData),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return await response.json();
}

export async function toggleLikePost(
  postId: string,
  newLikesCount: number,
  newIsLikedState: boolean,
) {
  const response = await fetch(`${API_POST}/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likes: newLikesCount,
      liked: newIsLikedState,
    }),
  });

  if (!response.ok) {
    
    throw new Error("Failed to update like status");
  }

  return await response.json();
}
