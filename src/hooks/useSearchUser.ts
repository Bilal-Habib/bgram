import { useState } from "react"
import { useShowToast } from "./useShowToast"
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { UserDocument } from "../firebase/documentTypes"

export const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<UserDocument | null>(null)
  const showToast = useShowToast()

  const getUserProfile = async (username:string) => {
    setIsLoading(true)
    setUser(null)
    try {
      const usersRef = collection(firestore, 'users')
      const q = query(usersRef, where('username', '==', username))
      const querySnapshot: DocumentData = await getDocs(q)

      if (querySnapshot.empty) {
        return showToast('Error', 'User not found', 'error')
      }

      querySnapshot.forEach((doc: DocumentData) => {
        setUser(doc.data())
      })
    } catch (error) {
      displayErrorMessage(error, showToast)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return {isLoading, user, getUserProfile, setUser}
}

function displayErrorMessage(error: unknown, showToast: (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined) => void) {
  if (error instanceof Error) {
    showToast('Error', error.message, 'error')
  } else {
    showToast('Error', 'An error occurred with retreiving user profile by username', 'error')
    console.error(error)
  }
}