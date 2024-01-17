import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useShowToast } from './useShowToast';
import { UserDocument } from '../firebase/documentTypes';
import { auth, firestore } from '../firebase/firebase';

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
  
        if (docSnap.exists()) {
          const userData = docSnap.data() as UserDocument; // Assuming UserDocument is your data structure
          localStorage.setItem("user-info", JSON.stringify(userData));
          loginUser(userData);
          navigate('/home');
        } else {
          // Handle case where user data doesn't exist
          showToast('Error', 'User data not found', 'error');
        }
      }
    } catch (error) {
      displayErrorMessage(error)
    }

  }

  return {loading, error, login}
}
