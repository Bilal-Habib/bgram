import React from 'react'

interface PostFooterProps {
    username: string,
    postDescription: string,
    likes: number,
    comments: number
}

export const PostFooter: React.FC<PostFooterProps> = ({ username, postDescription, likes, comments }) => {
  return (
    <div className='mb-2 mt-auto'>
        <div className='flex p-2 space-x-2 pl-1'>
            {/* heart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            {/* comment icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
        </div>
        <div className='text-xs sm:text-sm'>
            <p className='ml-2 font-semibold'>{likes} likes</p>
            <div className='flex items-center my-1'>
                <p className='ml-2 font-semibold mr-1'>{username}</p>
                <p>{postDescription}</p>
            </div>
            <p className='ml-2 text-gray-500'>View all {comments} comments</p>
        </div>
    </div>
  )
}
