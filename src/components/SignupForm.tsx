import React from 'react'
import { useForm } from 'react-hook-form'
import {z, ZodType} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

type FormData = {
    email: string
    fullName: string
    username: string
    password: string
}

const schema: ZodType<FormData> = z.object({
    email: z.string()
    .email({ message: 'Invalid email format' })
        .max(255, { message: 'Email must be at most 255 characters' }),
    fullName: z.string()
        .min(2, { message: 'Full name must be at least 2 characters' })
        .max(50, { message: 'Full name must be at most 50 characters' }),
    username: z.string()
        .min(4, { message: 'Username must be at least 4 characters' })
        .max(20, { message: 'Username must be at most 20 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(50, { message: 'Password must be at most 50 characters' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),
  });

export const SignupCard = () => {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const submitData = (data: FormData) => {
        console.log("validation passed!", data)
    }

  return (
    <div className='bg-white sm:bg-gray-100'>
        <div className='flex justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit(submitData)} className='max-w-[400px] w-full max-auto bg-white p-4 sm:rounded-md shadow-lg'>
                <h2 className='text-4xl font-medium text-center py-6 font-logo'>BGram</h2>
                <div className='flex flex-col py-2'>
                    <label>Email</label>
                    <input className='border p-2' type="text" {...register('email')} />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Full Name</label>
                    <input className='border p-2' type="text" {...register('fullName')} />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text" {...register('username')} />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password" {...register('password')} />
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='p-2 text-center text-gray-500'>People who use our service may have uploaded your contact information to Instagram. Learn More</p>
                    <p className='p-2 text-center text-gray-500'>By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Privacy Policy and how we use cookies and similar technology in our Cookies Policy.</p>
                </div>
                <input type='submit' className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' />
            </form>
        </div>
    </div>
  )
}
