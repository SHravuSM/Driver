import React from 'react';
import { NavLink } from 'react-router-dom';
// import RIKSHA from '../images/rickshaw.png';
// import RIKSHA from '../images/Rickshaw.gif';
import CAR from '../images/Vehicle.gif';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { LogIn } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-4 sm:px-2 md:px-6 lg:px-8">
            {/* Welcome Section */}
            <h1 className="text-5xl md:text-4xl p-2 lg:text-5xl font-bold text-center mb-6 sm:mb-4">
                Welcome to <span className="text-yellow-400">Vihar</span>
            </h1>

            {/* SignIn Button */}
            <NavLink
                to="/signin"
                className="text-sm sm:text-xl md:text-lg lg:text-xl font-semibold bg-white text-blue-500 rounded-md py-2 px-4 sm:px-8 sm:py-3 mb-4 sm:mb-3 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md hover:scale-105 transform"
            >
                <p>SignIn</p>
            </NavLink>

            {/* Login Card */}
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 sm:p-4 w-full sm:w-72 md:w-96">
                <h2 className="text-xl sm:text-lg md:text-2xl font-bold mb-4 sm:mb-3 text-center">
                    Login to <span className="text-blue-500">Vihar</span>
                </h2>
                <button
                    onClick={LogIn}
                    className="w-full py-2 sm:py-3 text-sm sm:text-xs md:text-base font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md"
                >
                    Login with Google
                </button>
            </div>
            <div className='flex mt-6 gap-2 items-center justify-center'>
                <p className="text-lg opacity-80 text-center">
                Sign in to Manage your Vehicles
            </p>
            {/* <img className='h-10' src={RIKSHA} alt="" /> */}
            <img className='h-8' src={CAR} alt="" />
            </div>
        </div>
    );
}