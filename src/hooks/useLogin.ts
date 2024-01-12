import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [
    signInWithEmailAndPassword,
    ,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate()

  const loginUser = useAuthStore((state) => state.login)

  const login = async (inputs: { email: string; password: string; }) => {
    try {
      const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
      if (userCred) {
        const docRef = doc(firestore, "users", userCred.user.uid)
        const docSnap = await getDoc(docRef)
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()))
        loginUser(docSnap.data())
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
    }

  }

  return {loading, error, login}
}
