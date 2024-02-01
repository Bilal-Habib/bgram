import { useEffect, useState } from "react";
import {useShowToast} from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { UserDocument } from "../firebase/documentTypes";

export const useGetUserProfileById = (userId: string) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState<UserDocument | null>(null);

	const showToast = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			setUserProfile(null);
			try {
				const userRef = await getDoc(doc(firestore, "users", userId));
				if (userRef.exists()) {
					setUserProfile(userRef.data() as UserDocument);
				}
			} catch (error) {
				showToast("Error", "Could not get user profile", "error");
			} finally {
				setIsLoading(false);
			}
		};
		getUserProfile();
	}, [showToast, setUserProfile, userId]);

	return { isLoading, userProfile, setUserProfile };
};
