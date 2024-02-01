import React, { useEffect, useRef, FormEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  Input,
  ModalHeader,
} from '@chakra-ui/react';
import { Comment } from '../Comment/Comment';
import { PostDocument } from '../../firebase/documentTypes';
import { usePostComment } from '../../hooks/usePostComment';

interface PostModalProps {
  post: PostDocument;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentsModal: React.FC<PostModalProps> = ({ post, isOpen, onClose }) => {
  const { handlePostComment, isCommenting } = usePostComment();
  const commentRef = useRef<HTMLInputElement>(null);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmitComment = async (e: FormEvent) => {
    // do not refresh the page, prevent it
    e.preventDefault();
    if (commentRef.current) {
      await handlePostComment(post.id, commentRef.current.value);
      commentRef.current.value = '';
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
      }
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex mb={4} gap={4} flexDir={'column'} maxH={'250px'} overflowY={'auto'} ref={commentsContainerRef}>
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
            <Input placeholder='Comment' size={'sm'} ref={commentRef} />
            <Flex w={'full'} justifyContent={'flex-end'}>
              <Button type='submit' ml={'auto'} size={'sm'} my={4} isLoading={isCommenting}>
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
