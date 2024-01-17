import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"
import { useUserProfileStore } from "../store/userProfileStore"
import { useShowToast } from "./useShowToast"
import { DocumentData, DocumentReference, arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { UserDocument } from "../firebase/documentTypes"

export const useFollowUser = (targetUserId: string) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const {user, setUser} = useAuthStore()
  const {userProfile, setUserProfile} = useUserProfileStore()
  const showToast = useShowToast()

  const handleFollowUser = async () => {
    if (!targetUserId) {
      console.error('Target user ID is empty');
      return;
    }
    
    setIsUpdating(true)
    try {
      if (!user || !userProfile) {
        showToast('Error', 'User is null', 'error')
        return
      }

      const currentUserRef = doc(firestore, "users", user.uid)
      const targetUserRef = doc(firestore, "users", targetUserId)

      await updateDocumentForCurrentUserFollowing(currentUserRef, isFollowing, targetUserId)
      await updateDocumentForTargetUserFollowers(targetUserRef, isFollowing, user)

      if (isFollowing) {
        // unfollow
        UpdateLocalStateForCurrentUserUnfollow(setUser, user, targetUserId)
        UpdateLocalStateForTargetUserUnfollow(setUserProfile, userProfile, user)
        UpdateLocalStorageAfterUnfollow(user, targetUserId)
        setIsFollowing(false)
      } else {
        // follow
        UpdateLocalStateForCurrentUserFollow(setUser, user, targetUserId)
        UpdateLocalStateForTargetUserFollow(setUserProfile, userProfile, user)
        UpdateLocalStorageAfterFollow(user, targetUserId)
        setIsFollowing(true)
      }
    } catch (error) {
      displayErrorMessage(error, showToast)
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(targetUserId)
      setIsFollowing(isFollowing)
    }
  },[user, targetUserId])

  return {isUpdating, isFollowing, handleFollowUser}
}

function UpdateLocalStorageAfterFollow(user: UserDocument, targetUserId: string) {
  localStorage.setItem("user-info", JSON.stringify({
    ...user,
    following: [...user.following, targetUserId]
  }))
}

function UpdateLocalStateForTargetUserFollow(setUserProfile: (userProfile: UserDocument | null) => void, userProfile: UserDocument, user: UserDocument) {
  setUserProfile({
    ...userProfile,
    followers: [...userProfile.followers, user.uid]
  })
}

function UpdateLocalStateForCurrentUserFollow(setUser: (user: UserDocument | null) => void, user: UserDocument, targetUserId: string) {
  setUser({
    ...user,
    following: [...user.following, targetUserId]
  })
}

function UpdateLocalStorageAfterUnfollow(user: UserDocument, targetUserId: string) {
  localStorage.setItem("user-info", JSON.stringify({
    ...user,
    following: user.following.filter((uid) => uid !== targetUserId)
  }))
}

function UpdateLocalStateForTargetUserUnfollow(setUserProfile: (userProfile: UserDocument | null) => void, userProfile: UserDocument, user: UserDocument) {
  setUserProfile({
    ...userProfile,
    followers: userProfile.following.filter((uid) => uid !== user.uid)
  })
}

function UpdateLocalStateForCurrentUserUnfollow(setUser: (user: UserDocument | null) => void, user: UserDocument, targetUserId: string) {
  setUser({
    ...user,
    following: user.following.filter((uid) => uid !== targetUserId)
  })
}

async function updateDocumentForTargetUserFollowers(targetUserRef: DocumentReference<DocumentData, DocumentData>, isFollowing: boolean, user: UserDocument) {
  await updateDoc(targetUserRef, {
    followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
  })
}

async function updateDocumentForCurrentUserFollowing(currentUserRef: DocumentReference<DocumentData, DocumentData>, isFollowing: boolean, userId: string) {
  await updateDoc(currentUserRef, {
    following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
  })
}

function displayErrorMessage(error: unknown, showToast: (title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined) => void) {
  if (error instanceof Error) {
    showToast('Error', error.message, 'error')
  } else {
    showToast('Error', 'An error occurred with retreiving user profile by username', 'error')
    console.error(error)
  }
}