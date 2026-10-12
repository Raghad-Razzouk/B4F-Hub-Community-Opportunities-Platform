export type PostCategory =
  | "announcement"
  | "event"
  | "community"
  | "resource";
export type PostCategoryFilter = "all" | PostCategory;

export type OpportunityType =
  | "job"
  | "internship"
  | "scholarship"
  | "volunteer";

export type WorkMode = "remote" | "hybrid" | "on-site";

export type OpportunityTypeFilter = "all" | OpportunityType;

export type WorkModeFilter = "all" | WorkMode;

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
  type: OpportunityType;
  workMode:  WorkMode;
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
