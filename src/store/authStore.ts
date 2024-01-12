import { DocumentData } from 'firebase/firestore';
import {create} from 'zustand';

interface AuthStore {
    user: DocumentData | null;
    login: (user: DocumentData | undefined) => void;
    logout: () => void;
    setUser: (user: DocumentData | undefined | null) => void;
}

const useAuthStore = create<AuthStore>((set) => {
    const storedUser = localStorage.getItem("user-info");
    const initialUser = storedUser ? JSON.parse(storedUser) : null;

    return {
        user: initialUser,
        login: (user) => set({ user }),
        logout: () => set({ user: null }),
        setUser: (user) => set({ user }),
    };
});

export default useAuthStore;
