import { NavFooter } from '../components/NavBar/NavFooter'
import { Container, Flex } from '@chakra-ui/react'
import { ProfileHeader } from '../components/Profile/ProfileHeader'
import { ProfileTabs } from '../components/Profile/ProfileTabs'
import { ProfilePosts } from '../components/Profile/ProfilePosts'
import { useGetUserProfileByUsername } from '../hooks/useGetUserProfileByUsername'
import { useParams } from 'react-router-dom'
import { ProfileHeaderSkeleton } from '../components/Profile/ProfileHeaderSkeleton'
import { UserNotFound } from '../components/NotFound/UserNotFound'

export const Profile = () => {
  const {username} = useParams()
  const {isLoading, userProfile} = useGetUserProfileByUsername(username)

  const userFound = !isLoading && userProfile
  const userNotFound = !isLoading && !userProfile
  
  if (userNotFound) {
    return <UserNotFound />
  }

  return <>
    <Container maxW="container.lg" py={5}>
      <Flex
        py={10}
        px={4}
        pl={{base:4,md:10}}
        w={'full'}
        mx={'auto'}
        flexDirection={'column'}
      >
        {userFound && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>

      <Flex
        px={{base:2, sm:4}}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={'black.300'}
        direction={'column'}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
    <NavFooter />
  </>
  
  
}
