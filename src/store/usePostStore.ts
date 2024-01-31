import { create } from "zustand";
import { PostDocument } from "../firebase/documentTypes";

interface PostStore {
  posts: PostDocument[];
  createPost: (post: PostDocument) => void;
  setPosts: (posts: PostDocument[]) => void;
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
}));
