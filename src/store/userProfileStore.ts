import {create} from 'zustand';
import { PostDocument, UserDocument } from '../firebase/documentTypes';

interface UserProfileStore {
    userProfile:  UserDocument | null
    setUserProfile: (userProfile: UserDocument | null) => void
    addPost: (post: PostDocument) => void;
    deletePost: (postId: string) => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
    // this is used to update the number of posts in the profile page
	addPost: (post) =>
        set((state) => ({
            userProfile: { ...state.userProfile!, posts: [post.id, ...state.userProfile!.posts] },
        })),
    deletePost: (postId) =>
		set((state) => ({
			userProfile: {
				...state.userProfile!,
				posts: state.userProfile!.posts.filter((id) => id !== postId),
            },
        })),
}))