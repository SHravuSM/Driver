import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const { SignInWithGoogle, mobile, setMobile } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-4">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full sm:w-96 max-w-md">
        <h1 className="text-3xl font-bold text-center text-gradient mb-6">
          Enter Your Mobile Number
        </h1>
        <p className="text-lg text-gray-600 text-center mb-4">
          Please enter a valid 10-digit mobile number to proceed.
        </p>
        <input
          type="number"
          placeholder="Enter Mobile.No"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value.length <= 10 ? e.target.value : mobile) // Limit input to 10 digits
          }
          className="w-full p-4 border-2 border-gray-300 rounded-xl mb-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
        {mobile.length === 10 && (
          <button
            onClick={SignInWithGoogle}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-xl rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-300"
          >
            Continue With Google
          </button>
        )}
        <p className="text-center mt-4 text-sm text-gray-500">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}