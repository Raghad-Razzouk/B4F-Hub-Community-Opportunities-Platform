import { Post, PostCategory, Opportunity } from "./types";

const API_POST = "/api/posts";
const API_OPPORTUNITIES = "/api/opportunities";

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

export async function fetchOpportunities() {
  const response = await fetch(API_OPPORTUNITIES);
  const opportunities = (await response.json()) as Opportunity[];

  return opportunities;
}

export async function applyToOpportunity(
  opportunityId: string,
) {
  const response = await fetch(
    `${API_OPPORTUNITIES}/${opportunityId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applied: true,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || "Failed to apply",
    );
  }

  return (await response.json()) as Opportunity;
}