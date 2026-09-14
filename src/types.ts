export type PostCategory =
  | "announcement"
  | "event"
  | "community"
  | "resource";
export type PostCategoryFilter = "all" | PostCategory;

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  category: PostCategory;
  createdAt: string;
  likes: number;
  liked?: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: "job" | "internship" | "scholarship" | "volunteer";
  workMode: "remote" | "hybrid" | "on-site";
  location: string;
  skills: string[];
  description?: string;
  applied?: boolean;
  deadline?: string;
}

export interface AppNotification {
  id: string;
  message: string;
  type: "success" | "error";
}
