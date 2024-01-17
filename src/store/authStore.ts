import {create} from 'zustand';
import { UserDocument } from '../firebase/documentTypes';

interface AuthStore {
    user: UserDocument | null;
    login: (user: UserDocument) => void;
    logout: () => void;
    setUser: (user: UserDocument | null) => void;
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
