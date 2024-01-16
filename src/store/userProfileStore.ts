import { DocumentData } from 'firebase/firestore';
import {create} from 'zustand';

interface UserProfileStore {
    userProfile:  DocumentData | null
    setUserProfile: (userProfile: DocumentData | null) => void
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set({userProfile}),
}))