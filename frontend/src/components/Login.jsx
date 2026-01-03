import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { Input } from './ui/input'
import Logo from './shared/Logo'
import { Button } from './ui/button'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/authSlice'
const Login = () => {

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            console.log(response);
            if (response.data.success) {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    dispatch(setAuthUser(response.data.user));
                }
                toast.success(response.data.message);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <form className='w-96 p-8 shadow-lg' onSubmit={handleSubmit}>
                <div className='w-full flex justify-center mb-5'>
                    <Logo />
                </div>
                <div className='mb-5'>
                    <Label htmlFor="email" className='mb-2'>Email</Label>
                    <Input type="email" name="email" onChange={handleChange} value={input.email} />
                </div>
                <div className='mb-5'>
                    <Label htmlFor="password" className='mb-2'>Password</Label>
                    <Input type="password" name="password" onChange={handleChange} value={input.password} />
                </div>
                <Button type="submit" className='w-full mb-5'>Login</Button>
                <p className='text-sm text-center'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></p>
            </form>
        </div>
    )
}

export default Login