import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin';
import { Alert, AlertIcon, Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { useShowToast } from '../hooks/useShowToast';

type LoginInputs = {
    email: string
    password: string
}

const schema: ZodType<LoginInputs> = z.object({
    email: z.string()
        .email({ message: 'Invalid email format' })
        .max(255, { message: 'Email must be at most 255 characters' }),
    password: z
        .string()
        .max(50, { message: 'Password must be at most 50 characters' })
});

export const LoginForm = () => {
    const { 
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm<LoginInputs>({
        resolver: zodResolver(schema)
    })

    const showToast = useShowToast() 
    
    const { loading, error, login } = useLogin();

    const submitData = (inputs: LoginInputs) => {
        console.log("validation passed!", inputs)
        login(inputs)
    }

  return (
    <div className='bg-gray-100'>
        <div className='flex justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit(submitData)} className='max-w-[400px] w-full max-auto bg-white p-4 rounded-md shadow-lg'>
                <h2 className='text-4xl font-medium text-center py-6 font-logo'>BGram</h2>
                <div className='flex flex-col py-2'>
                    <label>Email</label>
                    <input {...register('email')} className='border p-2' type="text" />
                    {errors.email && <span className="error text-red-600">{errors.email.message}</span>}
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input {...register('password')} className='border p-2' type="password" />
                    {errors.password && <span className="error text-red-600">{errors.password.message}</span>}
                </div>
                {error && (
                    <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                        <AlertIcon fontSize={12} />
                        {'Email or password is incorrect, please try again'}
                    </Alert>
                )}
                <Button
                    type="submit"
                    className="border w-full my-5 py-2"
                    colorScheme='blue'
                    isLoading={loading} // Chakra UI's loading state
                    disabled={loading}
                    _disabled={{ opacity: 0.5 }} // Tailwind opacity for better visibility
                >
                    {loading ? 'Logging In...' : 'Log In'}
                </Button>
                <div className='flex justify-between'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember Me</p>
                    <Link to="/signup">Create an account?</Link>
                </div>
            </form>
        </div>
    </div>
  )
}
