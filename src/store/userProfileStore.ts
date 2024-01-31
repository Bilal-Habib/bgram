import {create} from 'zustand';
import { UserDocument } from '../firebase/documentTypes';

interface UserProfileStore {
    userProfile:  UserDocument | null
    setUserProfile: (userProfile: UserDocument | null) => void
    deletePost: (postId: string) => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
    deletePost: (postId) =>
		set((state) => ({
			userProfile: {
				...state.userProfile!,
				posts: state.userProfile!.posts.filter((id) => id !== postId),
            },
        })),
}))