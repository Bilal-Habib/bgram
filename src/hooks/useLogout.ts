import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/firebase'
import { useShowToast } from './useShowToast'

export const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth)
  const showToast = useShowToast()

  const displayErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      showToast('Error', error.message, 'error')
    } else {
      showToast('Error', 'An error occurred', 'error')
    }
  }

  function displaySuccessMessage(success: boolean) {
    if (success) {
      showToast('Success', 'Logged out successfully', 'success')
      window.location.reload();
    }
  }

  const logout = async () => {
    try {
      const success = await signOut()
      localStorage.removeItem('user-info')
      displaySuccessMessage(success)
    } catch (error) {
      displayErrorMessage(error)
    }
  }

  return {logout, isLoggingOut, error}
}
