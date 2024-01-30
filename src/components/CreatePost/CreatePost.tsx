import { Image, Button, CloseButton, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useShowToast } from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { usePostStore } from "../../store/usePostStore";
import { useUserProfileStore } from "../../store/userProfileStore";
import { firestore, storage } from "../../firebase/firebase";
import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { PostDocument } from "../../firebase/documentTypes";

export const CreatePost = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [caption, setCaption] = useState("")
    const imageRef = useRef<HTMLInputElement>(null)
    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg()
    const { isLoading, handleCreatePost } = useCreatePost()
    const showToast = useShowToast()

    const handlePostCreation = async () => {
		try {
            if (!selectedFile) {
                return
            }
			await handleCreatePost(selectedFile, caption);
			onClose();
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", "Could not create post", "error");
		}
	};

	return (
		<>
			<div onClick={onOpen} style={{ cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
			</div>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"white"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea placeholder='Post caption...' 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />

						<Input type='file' hidden ref={imageRef} onChange={handleImageChange}/>

						<BsFillImageFill
                            onClick={() => imageRef.current?.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>

                        {selectedFile && (
                        <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                            <Image src={selectedFile} alt='Selected img' />
                            <CloseButton
                            position={"absolute"}
                            top={2}
                            right={2}
                            onClick={() => {
                                setSelectedFile(null);
                            }}
                            />
                        </Flex>
                        )}

					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};


function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);

	const handleCreatePost = async (selectedFile: string, caption: string) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);

        if (!authUser || !userProfile) {
            return null
        }

		const newPost: PostDocument = {
            id: "",
			caption: caption,
			likes: [],
			comments: [],
			createdAt: new Date(),
			createdBy: authUser.uid,
            imageURL: ""
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });

			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) {
                createPost({ ...newPost, id: postDocRef.id });
            }

			showToast("Success", "Post created successfully", "success");
		} catch (error) {
			showToast("Error", "Post was not created due to an error", "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}