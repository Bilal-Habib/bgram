import { create } from "zustand";
import { CommentDocument, PostDocument } from "../firebase/documentTypes";

interface PostStore {
  posts: PostDocument[];
  createPost: (post: PostDocument) => void;
  setPosts: (posts: PostDocument[]) => void;
  deletePost: (id: string) => void;
  addComment: (postId: string, comment: CommentDocument) => void
}

export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setPosts: (posts) => set({ posts }),
  deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
}));
