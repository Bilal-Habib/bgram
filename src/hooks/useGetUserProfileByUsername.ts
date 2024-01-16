import { useEffect, useState } from "react"
import { useShowToast } from "./useShowToast"
import { DocumentData, collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useUserProfileStore } from "../store/userProfileStore"

export const useGetUserProfileByUsername = (username: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true)
  const showToast = useShowToast()
  const {userProfile, setUserProfile} = useUserProfileStore()

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const usersRef = collection(firestore, 'users')
        const q = query(usersRef, where('username', '==', username))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          setUserProfile(null)
          return
        }

        let userDoc: DocumentData | null = null
        querySnapshot.forEach((doc) => {
          userDoc = doc.data()
        })

        setUserProfile(userDoc)
      } catch (error) {
        displayErrorMessage(error, showToast)
      } finally {
        setIsLoading(false)
      }
    }

    getUserProfile()
  }, [setUserProfile, username, showToast])

  return {isLoading, userProfile}
}

function displayErrorMessage(error: unknown, showToast: (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined) => void) {
  if (error instanceof Error) {
    showToast('Error', error.message, 'error')
  } else {
    showToast('Error', 'An error occurred with retreiving user profile by username', 'error')
    console.error(error)
  }
}

