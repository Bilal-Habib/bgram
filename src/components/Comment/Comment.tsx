import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface CommentProps {
    createdAt: string,
    username: string,
    profilePic: string,
    text: string
}

export const Comment: React.FC<CommentProps> = ({ createdAt, username, profilePic, text }) => {
  return <Flex gap={4}>
    <Avatar src={profilePic} name={username} size={'sm'}/>
    <Flex direction={'column'}>
      <Flex gap={2}>
        <Text fontWeight={'bold'} fontSize={'xs'}>
          {username}
        </Text>
        <Text fontSize={'xs'} color={'gray.500'}>
          {createdAt}
        </Text>
      </Flex>
      <Text fontSize={'sm'}>
        {text}
      </Text>
    </Flex>
  </Flex>
}
