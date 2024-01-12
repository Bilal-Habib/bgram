import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useShowToast } from './useShowToast';

export const useLogin = () => {
  const [
    signInWithEmailAndPassword,
    ,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate()
  const showToast = useShowToast()

  const loginUser = useAuthStore((state) => state.login)

  const displayErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      showToast('Error', error.message, 'error')
    } else {
      showToast('Error', 'An error occurred', 'error')
      console.error(error)
    }
  }

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
      displayErrorMessage(error)
    }

  }

  return {loading, error, login}
}
