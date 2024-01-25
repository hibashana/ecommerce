
"use client"
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { MdOutlineMailOutline, MdArrowBackIos } from 'react-icons/md';
import Link from 'next/link';
import { baseURL } from '@/utils/constants';
// import { Forgotpass } from '@/app/types';
import { useRouter } from 'next/navigation';

const ForgotPass = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const setpass = async (): Promise<void> => {
    try {
      // const baseURL = "https://0e15-2405-201-f00a-882c-64fd-eda5-d757-1116.ngrok-free.app/v1";
      const URL = `${baseURL}/auth/forgot-password`;
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success response as needed
        console.log('Successful', data);
        router.push(`/reset-password?token=${data.resetPasswordToken}`);
      } else {
        setErrorMessage('Incorrect email.');
        console.error('Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setpass();
  };
 // Redirect after a successful request
  // useEffect(() => {
  //   if (formData.email && !errorMessage) {
  //     router.push('/update_pass');
  //   }
  // }, [formData.email, errorMessage, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg w-80 p-9">
        <h1 className="font-bold py-5">Forgot password?</h1>
        <h3 className="text-sm py-5">
          Enter email associated with your account and we'll send an email with instructions to reset your password
        </h3>
        <div className="flex items-center border rounded overflow-hidden">
          <span className="text-gray-400 text-lg p-3">
            <MdOutlineMailOutline />
          </span>
          <input
            className="w-full  outline-none focus:outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email here"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center">
          <button className="mt-6 flex button-primary-color text-white rounded-3xl p-1 px-4" onClick={handleSubmit}>
            Send
          </button>
        </div>
        {errorMessage && <p className="p-1  text-center text-red-500 ">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPass;
