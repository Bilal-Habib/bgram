import React from 'react';
import { PostHeader } from '../HomePosts/PostHeader';
import { PostFooter } from '../HomePosts/PostFooter';

interface PostCardProps {
  username: string,
  profileImageUrl: string,
  postUrl: string,
  postDescription: string,
  likes: number,
  comments: number
}

export const PostCard: React.FC<PostCardProps> = ({ username, profileImageUrl, postUrl, postDescription, likes, comments }) => {
  return (
    <div className="bg-white border border-gray-100 items-center sm:text-xs lg:px-50 xl:px-96">

      <PostHeader
        username={username}
        profileImageUrl={profileImageUrl}
      />

      <div>
        <img className='w-full object-cover' src={postUrl} alt="Post url" />
      </div>

      <PostFooter 
        username={username}
        postDescription={postDescription}
        likes={likes}
        comments={comments}
      />

    </div>
  );
};
