import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import {useFollowUser} from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
import { UserDocument } from "../../firebase/documentTypes";

interface SuggestedUserProps {
    user: UserDocument
    setUser: any
}

export const SuggestedUser: React.FC<SuggestedUserProps> = ({ user, setUser }) => {
	const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
	const authUser = useAuthStore((state) => state.user);

    if (!authUser) {
        return null
    }

	const onFollowUser = async () => {
		await handleFollowUser();
		setUser({
			...user,
			followers: isFollowing
				? user.followers.filter((follower) => follower !== authUser.uid)
				: [...user.followers, authUser.uid],
		});
	};

	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
			<Flex alignItems={"center"} gap={2}>
				<Link to={`/${user.username}`}>
					<Avatar src={user.profilePicUrl} size={"md"} />
				</Link>
				<VStack spacing={2} alignItems={"flex-start"}>
					<Link to={`/${user.username}`}>
						<Box fontSize={12} fontWeight={"bold"}>
							{user.fullName}
						</Box>
					</Link>
					<Box fontSize={11} color={"gray.500"}>
						{user.followers.length} followers
					</Box>
				</VStack>
			</Flex>
			{authUser.uid !== user.uid && (
				<Button
					fontSize={13}
					bg={"transparent"}
					p={0}
					h={"max-content"}
					fontWeight={"medium"}
					color={"blue.400"}
					cursor={"pointer"}
					_hover={{ color: "white" }}
					onClick={onFollowUser}
					isLoading={isUpdating}
				>
					{isFollowing ? "Unfollow" : "Follow"}
				</Button>
			)}
		</Flex>
	);
};
