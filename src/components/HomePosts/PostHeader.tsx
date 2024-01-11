import React from 'react'

interface PostHeaderProps {
    username: string,
    profileImageUrl: string,
}

export const PostHeader: React.FC<PostHeaderProps> = ({ username, profileImageUrl }) => {
  return (
    <div className="bg-white border-b border-gray-100 p-3 flex items-center">
        <div className="flex">
            <img className='mr-2 w-6 rounded-full object-cover' src={profileImageUrl} alt="Default Profile Pic" loading='lazy'/>
            <p className='mt-1'>{username}</p>
        </div>
    </div>
  )
}
