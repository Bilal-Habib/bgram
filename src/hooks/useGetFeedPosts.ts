import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import {useShowToast} from "./useShowToast";
import {useUserProfileStore} from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { usePostStore } from "../store/usePostStore";
import { PostDocument } from "../firebase/documentTypes";

const useGetFeedPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();
	const { setUserProfile } = useUserProfileStore();

	useEffect(() => {
		const getFeedPosts = async () => {
			setIsLoading(true);
			if (authUser?.following.length === 0) {
				setIsLoading(false);
				setPosts([]);
				return;
			}
			const q = query(collection(firestore, "posts"), where("createdBy", "in", authUser?.following));
			try {
				const querySnapshot = await getDocs(q);
				const feedPosts: PostDocument[] = [];

				querySnapshot.forEach((doc) => {
					feedPosts.push({
                        id: doc.id,
                        caption: doc.data().caption,
                        likes: doc.data().likes,
                        comments: doc.data().comments,
                        createdAt: doc.data().createdAt,
                        createdBy: doc.data().createdBy,
                        imageURL: doc.data().imageURL,
                    });
				});

				feedPosts.sort((a, b) => b.createdAt - a.createdAt);
				setPosts(feedPosts);
			} catch (error) {
				showToast("Error", "Could not get feed posts", "error");
			} finally {
				setIsLoading(false);
			}
		};

		if (authUser) getFeedPosts();
	}, [authUser, showToast, setPosts, setUserProfile]);

	return { isLoading, posts };
};

export default useGetFeedPosts;