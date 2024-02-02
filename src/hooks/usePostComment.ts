import { useState } from "react"
import { useShowToast } from "./useShowToast";
import useAuthStore from "../store/authStore";
import { usePostStore } from "../store/usePostStore";
import { CommentDocument } from "../firebase/documentTypes";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.user);
	const addComment = usePostStore((state) => state.addComment);

    const handlePostComment = async (postId: string, comment: string) => {
		if (isCommenting) return;
		if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
		setIsCommenting(true);
		const newComment: CommentDocument = {
			comment: comment,
			createdAt: Date.now(),
			createdBy: authUser.uid,
			postId: postId
		};
		try {
			await updateDoc(doc(firestore, "posts", postId), {
				comments: arrayUnion(newComment),
			});
			addComment(postId, newComment);
		} catch (error) {
			showToast("Error", "Could not add comment", "error");
		} finally {
			setIsCommenting(false);
		}
	};

	return { isCommenting, handlePostComment };
}
