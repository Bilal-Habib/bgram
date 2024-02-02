import { useState } from "react";
import useAuthStore from "../store/authStore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useUserProfileStore } from "../store/userProfileStore";
import { useShowToast } from "./useShowToast";
import { UserDocument } from "../firebase/documentTypes";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
	const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
	const showToast = useShowToast();

	const editProfile = async (inputs: { fullName: any; username: any; bio: any; }, selectedFile: string | null) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const storageRef = ref(storage, `profilePics/${authUser.uid}`);
		const userDocRef = doc(firestore, "users", authUser.uid);

		let URL = "";
		try {
			if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
			}

			const updatedUser: UserDocument = {
				...authUser,
				fullName: inputs.fullName || authUser.fullName,
				username: inputs.username || authUser.username,
				bio: inputs.bio || authUser.bio,
				profilePicUrl: URL || authUser.profilePicUrl,
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setUserProfile(updatedUser);
			showToast("Success", "Profile updated successfully", "success");
		} catch (error) {
			showToast("Error", "Could not update profile", "error");
		}
	};

	return { editProfile, isUpdating };
};

export default useEditProfile;