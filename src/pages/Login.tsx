import { useAuthStore } from '@/store/AuthStore';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);


const EyeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// Eye-slash icon
const EyeSlashIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
    </svg>
);


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const {setAs,setUser}  = useAuthStore();
    const navigate = useNavigate();
   const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json());

        if (response.error) {
            alert(response.error);
        } else {
            alert("Login successful");

            
            setUser(response.user);
            console.log(response.user)
            setAs("student");

            navigate("/");
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong!");
    }
};


    return (
        // Main container with the background color scheme from your image
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-50 via-green-50 to-teal-100 p-4 font-sans"> 
            <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in-up"> 
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <div className="bg-cyan-500 p-3 rounded-full">
                           <UserCircleIcon className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-500 mt-2">Please sign in to continue.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email or Username
                        </label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
                            placeholder="you@example.com"
                        />
                    </div>
                    
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name='password'
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-300"
                            placeholder="••••••••"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute inset-y-0 right-0 top-6 flex items-center px-4 text-gray-500 hover:text-cyan-600"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                             {showPassword ? <EyeSlashIcon className="h-6 w-6"/> : <EyeIcon className="h-6 w-6"/>}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium text-cyan-600 hover:text-cyan-500 hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    
                    
                    <button 
                        type='submit'
                        className="w-full bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Log In
                    </button>
                    
                    
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to='/register'>
                    <span className="font-medium text-green-600 hover:text-green-500 hover:underline">
                        Sign Up Now
                    </span>
                    </Link>
                </p>
                <Link to="/admin">
                <p className='text-right underline hover:text-green-500 cursor-pointer'>Login as admin</p>
                </Link>
            </div>
        </div>
    );
}

// Add this to your tailwind.config.js for the animation
/*
module.exports = {
  // ...
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
              opacity: '0',
              transform: 'translateY(20px)'
          },
          '100%': {
              opacity: '1',
              transform: 'translateY(0)'
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
    },
  },
  // ...
}
*/
