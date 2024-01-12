import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { UserDocument } from '../firebase/documentTypes';
import { UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useShowToast } from './useShowToast';

export const useSignup = () => {
    const showToast = useShowToast()

    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const signup = async (inputs: { email: string; password: string; }) => {
        try {
            const newUser: UserCredential | undefined = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser && error) {
                showToast("Error", "Account with email already exists", "error")
                return
            }
            if (newUser) {
                const userDocument: UserDocument = createUser(newUser, inputs)
                await setDoc(doc(firestore, "users", newUser.user.uid), userDocument)
                localStorage.setItem("userinfo", JSON.stringify(userDocument))
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
        createdAt: new Date()
    };
}

