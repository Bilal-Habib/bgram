import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import { useShowToast } from './useShowToast'
import useAuthStore from '../store/authStore'

export const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth)
  const showToast = useShowToast()
  const logoutUser = useAuthStore(state => state.logout)

  const displayErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      showToast('Error', error.message, 'error')
    } else {
      showToast('Error', 'An error occurred', 'error')
    }
  }

  function handleSuccess(success: boolean) {
    if (success) {
      showToast('Success', 'Logged out successfully', 'success')
      logoutUser()
    }
  }

  const logout = async () => {
    try {
      const success = await signOut()
      localStorage.removeItem('user-info')
      handleSuccess(success)
    } catch (error) {
      displayErrorMessage(error)
    }
  }

  return {logout, isLoggingOut, error}
}
