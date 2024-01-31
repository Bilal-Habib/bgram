import { useEffect, useState } from "react";
import {useShowToast} from "./useShowToast";
import {useUserProfileStore} from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { usePostStore } from "../store/usePostStore";
import { PostDocument } from "../firebase/documentTypes";

export const useGetUserPosts = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { posts, setPosts } = usePostStore();
	const showToast = useShowToast();
	const userProfile = useUserProfileStore((state) => state.userProfile);

	useEffect(() => {
		const getPosts = async () => {
			if (!userProfile) return;
			setIsLoading(true);
			setPosts([]);

			try {
				const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
				const querySnapshot = await getDocs(q);

				const posts: PostDocument[] = [];
				querySnapshot.forEach((doc) => {
                    const post: PostDocument = {
                        id: doc.id,
                        caption: doc.data().caption,
                        likes: doc.data().likes,
                        comments: doc.data().comments,
                        createdAt: doc.data().createdAt,
                        createdBy: doc.data().createdBy,
                        imageURL: doc.data().imageURL,
                    }
					posts.push(post);
				});

				posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
				setPosts(posts);
			} catch (error) {
				showToast("Error", "Could not retrieve posts", "error");
                console.error(error)
				setPosts([]);
			} finally {
				setIsLoading(false);
			}
		};

		getPosts();
	}, [setPosts, userProfile, showToast]);

	return { isLoading, posts };
};
