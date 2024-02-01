import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { CommentDocument } from '../../firebase/documentTypes'

interface CommentProps {
    comment: CommentDocument
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return <Flex gap={4}>
    {/* <Avatar src={comment.profilePic} name={username} size={'sm'}/> */}
    <Flex direction={'column'}>
      <Flex gap={2}>
        <Text fontWeight={'bold'} fontSize={'xs'}>
          {"username"}
        </Text>
        <Text fontSize={'xs'} color={'gray.500'}>
          {Date.now()}
        </Text>
      </Flex>
      <Text fontSize={'sm'}>
        {comment.comment}
      </Text>
    </Flex>
  </Flex>
}
