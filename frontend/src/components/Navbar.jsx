import React from 'react'
import Logo from './shared/Logo'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarImage } from './ui/avatar';
import { LogOut, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    const handleLogout = async () => {
        try {
            // Call backend logout API to invalidate session/cookie
            await axios.post('http://localhost:8000/api/v1/user/logout', {}, {
                withCredentials: true
            });

            // Clear client-side storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Clear Redux state
            dispatch(setAuthUser(null));

            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);

            // Even if server logout fails, clear local data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch(setAuthUser(null));

            toast.error('Logout failed, but local session cleared');
            navigate('/login');
        }
    };
    return (
        <div className='border-b border-gray-300'>
            <div className='flex items-center justify-between max-w-7xl mx-auto h-16'>
                <Logo />
                {
                    user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user.profilePicture || "https://github.com/shadcn.png"} alt={user.fullname || "User"} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-64">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 p-2">
                                        <User className="w-4 h-4" />
                                        <div>
                                            <p className="font-medium">{user.fullname}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-white"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login"><Button>Login</Button></Link>
                            <Link to="/signup"><Button>Signup</Button></Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar