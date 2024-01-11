import React from 'react'
import { PostCard } from './PostCard'

export const Posts = () => {
  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <PostCard
            key={index}
            username="john_doe"
            profileImageUrl="profile_picture.jpeg"
            postUrl="post_picture.jpeg"
            postDescription="post description"
            likes={100}
            comments={2300}
        />
      ))}
    </div>
  )
}
