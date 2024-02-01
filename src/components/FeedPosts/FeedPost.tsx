import { Box, Image } from "@chakra-ui/react";
import {PostFooter} from "./PostFooter";
import {PostHeader} from "./PostHeader";
import { PostDocument } from "../../firebase/documentTypes";
import { useGetUserProfileById } from "../../hooks/useGetUserProfile";

interface FeedPostProps {
    post: PostDocument
}

export const FeedPost: React.FC<FeedPostProps> = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return userProfile && (
		<>
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={"hidden"}>
				<Image src={post.imageURL} alt={"FEED POST IMG"} />
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} isProfilePage={false} />
		</>
	);
};
