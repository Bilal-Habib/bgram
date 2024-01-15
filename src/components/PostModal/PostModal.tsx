import { Box, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Flex, Avatar, Divider, VStack, Text, Image, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { PostFooter } from '../HomePosts/PostFooter'
import { Comment } from "../Comment/Comment"

interface PostModalProps {
    img: string
    isOpen: boolean
    onClose: () => void
  }
  
export const PostModal: React.FC<PostModalProps> = ({ img, isOpen, onClose }) => {  
  return <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base:'3xl', md:'5xl'}} motionPreset='slideInBottom'>
    <ModalOverlay />
    <ModalContent>
        <ModalCloseButton />
          <ModalBody bg={'white'} pb={5}>
          <Flex gap={4} w={{base: '90%', sm: '70%', md: 'full'}} mx={'auto'} pt={3}>
              <Box
                borderRadius={4}
                overflow={'hidden'}
                flex={1.5}
              >
              <Image src={img} alt="profile post" />
              </Box>
              <Flex flex={1} flexDir={'column'} px={10} display={{base:'none', md:'flex'}}>
              <Flex alignItems={'center'} justifyContent={'space-between'}>
                  <Flex alignItems={'center'} gap={4}>
                  <Avatar src="profile_picture.jpeg" size={'sm'} name="Bilal"/>
                  <Text fontWeight={'bold'} fontSize={12}>
                      Bilal
                  </Text>
                  </Flex>
              </Flex>

              <Divider my={4}/>
              <VStack w='full' alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                  <Comment 
                  createdAt='1d ago'
                  username='bilal'
                  profilePic='profile_picture.jpeg'
                  text='This is a comment'
                  />
                  <Comment 
                  createdAt='1d ago'
                  username='bilal'
                  profilePic='profile_picture.jpeg'
                  text='This is a comment'
                  />
                  <Comment 
                  createdAt='1d ago'
                  username='bilal'
                  profilePic='profile_picture.jpeg'
                  text='This is a comment'
                  />
              </VStack>
              <Divider my={4} bg={'gray.800'}/>
              <PostFooter username={""} postDescription={""} likes={1000} comments={500} />
              </Flex>
          </Flex>
          </ModalBody>
      </ModalContent>
    </Modal>
}
