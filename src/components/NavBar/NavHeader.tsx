import React from 'react';
import { useLogout } from '../../hooks/useLogout';
import { Button } from '@chakra-ui/react';

export const NavHeader = () => {
  const {logout, isLoggingOut} = useLogout()

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex justify-between items-center">
        <h2 className='text-2xl text-center font-logo'>BGram</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
        </svg>
        <Button
          className='font-semibold'
          onClick={logout}
          isLoading={isLoggingOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};
