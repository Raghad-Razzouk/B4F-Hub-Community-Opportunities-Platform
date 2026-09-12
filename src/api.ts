import { Post } from "./types";
const API_POST = "/api/posts";

export async function fetchPosts() {
    const response = await fetch(API_POST);
    const posts = (await response.json()) as Post[];
    
    return posts;
}