import {
	Avatar,
	Button,
	Divider,
	Flex,
	GridItem,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {Comment} from "../Comment/Comment";
import {PostFooter} from "../FeedPosts/PostFooter";
import {useUserProfileStore} from "../../store/userProfileStore";
import { PostDocument } from "../../firebase/documentTypes";
import useAuthStore from "../../store/authStore";
import { usePostStore } from "../../store/usePostStore";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { storage, firestore } from "../../firebase/firebase";
import { useShowToast } from "../../hooks/useShowToast";
import { Caption } from "../Comment/Caption";

interface ProfilePostProps {
  post: PostDocument
}

export const ProfilePost: React.FC<ProfilePostProps> = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const userProfile = useUserProfileStore((state) => state.userProfile);
  	const authUser = useAuthStore((state) => state.user);
	const deletePost = usePostStore((state) => state.deletePost);
	const decrementPostsCount = useUserProfileStore((state) => state.deletePost);
	const [isDeleting, setIsDeleting] = useState(false);
	const showToast = useShowToast()

	const handleDeletePost = async () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		if (isDeleting) return;

		try {
			const imageRef = ref(storage, `posts/${post.id}`);
			await deleteObject(imageRef);

			if (!authUser) {
				console.error("Auth user is null")
				return
			}

			const userRef = doc(firestore, "users", authUser.uid);
			await deleteDoc(doc(firestore, "posts", post.id));

			await updateDoc(userRef, {
				posts: arrayRemove(post.id),
			});

			deletePost(post.id);
			decrementPostsCount(post.id);
			showToast("Success", "Post deleted successfully", "success");
		} catch (error) {
			showToast("Error", "Post could not be deleted", "error");
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<GridItem
				cursor={"pointer"}
				borderRadius={4}
				overflow={"hidden"}
				border={"1px solid"}
				borderColor={"whiteAlpha.300"}
				position={"relative"}
				aspectRatio={1 / 1}
				onClick={onOpen}
			>
				<Flex
					opacity={0}
					_hover={{ opacity: 1 }}
					position={"absolute"}
					top={0}
					left={0}
					right={0}
					bottom={0}
					bg={"whiteAlpha.700"}
					transition={"all 0.3s ease"}
					zIndex={1}
					justifyContent={"center"}
				>
					<Flex alignItems={"center"} justifyContent={"center"} gap={50}>
						<Flex>
							<AiFillHeart size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.likes.length}
							</Text>
						</Flex>

						<Flex>
							<FaComment size={20} />
							<Text fontWeight={"bold"} ml={2}>
								{post.comments.length}
							</Text>
						</Flex>
					</Flex>
				</Flex>

				<Image src={post.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
			</GridItem>

			<Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody bg={"white"} pb={5}>
						<Flex
							gap='4'
							w={{ base: "90%", sm: "70%", md: "full" }}
							mx={"auto"}
							maxH={"90vh"}
							minH={"50vh"}
						>
							<Flex
								borderRadius={4}
								overflow={"hidden"}
								border={"1px solid"}
								borderColor={"whiteAlpha.300"}
								flex={1.5}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Image src={post.imageURL} alt='profile post' />
							</Flex>
							<Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
								<Flex alignItems={"center"} justifyContent={"space-between"}>
									<Flex alignItems={"center"} gap={4}>
										<Avatar src={userProfile?.profilePicUrl} size={"sm"} name='As a Programmer' />
										<VStack alignItems={'start'} gap={0} mx={'auto'} flex={1}>
										<Text fontWeight={"bold"} fontSize={12}>
											{userProfile?.username}
										</Text>
										<Text fontSize={12}>
											{post.caption}
										</Text>
										</VStack>
									</Flex>
                  					{authUser?.uid === userProfile?.uid && (
										<Button
											size={"sm"}
											bg={"transparent"}
											_hover={{ bg: "whiteAlpha.300", color: "red.600" }}
											borderRadius={4}
											p={1}
											onClick={handleDeletePost}
											isLoading={isDeleting}
										>
											<MdDelete size={20} cursor='pointer' />
										</Button>
									)}
								</Flex>
								<Divider my={4} bg={"gray.500"} />

								<VStack w='full' alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
									{/* CAPTION */}
									{post.caption && <Caption post={post} />}
									{/* COMMENTS */}
									{post.comments.map((comment) => (
										<Comment comment={comment} />
									))}
								</VStack>
								<Divider my={4} bg={"gray.8000"} />

								<PostFooter isProfilePage={true} post={post} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
