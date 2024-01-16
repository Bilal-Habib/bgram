import {create} from 'zustand';
import { UserDocument } from '../firebase/documentTypes';

interface UserProfileStore {
    userProfile:  UserDocument | null
    setUserProfile: (userProfile: UserDocument | null) => void
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
}))