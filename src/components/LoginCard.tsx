import React from 'react'
import { Link } from 'react-router-dom'

export const LoginCard = () => {
  return (
    <div className='bg-gray-100'>
        <div className='flex justify-center items-center min-h-screen'>
            <form className='max-w-[400px] w-full max-auto bg-white p-4 rounded-md shadow-lg'>
                <h2 className='text-4xl font-medium text-center py-6 font-logo'>BGram</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password" />
                </div>
                <Link to="/home">
                    <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Sign In</button>
                </Link>
                <div className='flex justify-between'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember Me</p>
                    <Link to="/signup">Create an account?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}
