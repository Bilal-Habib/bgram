import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import useAuthStore from "../../store/authStore";
import { CommentLogo, NotificationsLogo } from "../../assets/constants";
import { PostDocument } from "../../firebase/documentTypes";

interface PostFooterProps {
    post: PostDocument
    isProfilePage: boolean
}

export const PostFooter: React.FC<PostFooterProps> = ({ post, isProfilePage }) => {
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { onOpen } = useDisclosure();

	return (
		<Box mb={10} marginTop={"auto"}>
			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
				<Box cursor={"pointer"} fontSize={18}>
					{<NotificationsLogo />}
				</Box>

				<Box cursor={"pointer"} fontSize={18}>
					<CommentLogo />
				</Box>
			</Flex>
			<Text fontWeight={600} fontSize={"sm"}>
				{post.likes} likes
			</Text>

			{isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={700}>
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
				</>
			)}

			{authUser && (
				<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
					<InputGroup>
						<Input
							variant={"flushed"}
							placeholder={"Add a comment..."}
							fontSize={14}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							ref={commentRef}
						/>
						<InputRightElement>
							<Button
								fontSize={14}
								color={"blue.500"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "white" }}
								bg={"transparent"}
							>
								Post
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
};

