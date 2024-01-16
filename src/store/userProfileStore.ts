import {create} from 'zustand';

export const useUserProfileStore = create((set) => ({
    userProfile: null,
    setUserProfile: (userProfile: any) => set({userProfile}),
}))