import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { UserDocument } from '../firebase/documentTypes';
import { UserCredential } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useShowToast } from './useShowToast';
import useAuthStore from '../store/authStore';
import { auth, firestore } from '../firebase/firebase';

type SignupFormInputs = {
    email: string
    fullName: string
    username: string
    password: string
}

export const useSignup = () => {
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)

    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const signup = async (inputs: SignupFormInputs) => {
        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('username', '==', inputs.username))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            showToast('Error', 'Username already exists', 'error')
            return
        }

        try {
            const newUser: UserCredential | undefined = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                showToast("Error", "Account with email already exists", "error")
                return
            }
            if (newUser) {
                const userDocument: UserDocument = createUser(newUser, inputs)
                await setDoc(doc(firestore, "users", newUser.user.uid), userDocument)
                localStorage.setItem("user-info", JSON.stringify(userDocument))
                loginUser(userDocument)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {loading, error, signup}
}

const createUser = (newUser: UserCredential, inputs: any): UserDocument => {
    return {
        uid: newUser.user.uid,
        email: inputs.email,
        fullName: inputs.fullName,
        username: inputs.username,
        password: inputs.password,
        bio: "",
        profilePicUrl: "",
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now()
    };
}

