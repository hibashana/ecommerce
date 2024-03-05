"use client"

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { baseURL } from '@/utils/constants';
import { setCookie } from 'cookies-next';
import { Toaster, toast } from 'sonner'

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  // useEffect(() => {
  //  
  // }, [errorMessage, formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // const baseURL="https://0e15-2405-201-f00a-882c-64fd-eda5-d757-1116.ngrok-free.app/v1" ;
      const URL = `${baseURL}/auth/login`;
      console.log(`url=${URL}`);
      const response = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); 
        console.log('Successful login', data);
        const token = data.tokens.access.token;
        // console.log(token);
        localStorage.setItem('token', token); 
       
        // const userId = data.user.id; 
        // localStorage.setItem('userId', userId); 
        // console.log(userId);
        const refresh = data.tokens.access.token; 
        console.log(refresh);
        localStorage.setItem('refresh', refresh);
        // const userData=data.user;
        // console.log(userData);

        const userDetails = {
          firstName: data.user.firstName,
          lastName: data.user.lastName,
        };
        console.log(userDetails);
        
        setCookie('userDetails', JSON.stringify(userDetails));

        toast.success("Logged In ");
        setCookie("islogin", "true");
        router.push('/');  
        
      } else {
        setErrorMessage('Incorrect username or password.');
        console.error('Login failed');
        // console.log(formData.email);
        // console.log(formData.password);
        
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg p-8 w-80">
        <h1 className="text-xl font-sans font-bold mb-6">
          Log into<br /> your account
        </h1>
        <form className="flex flex-col gap-4  font-medium text-sm p-1 ">
          <div className="relative mt-4">
            <input
              type="email"
              id="email"
              name="email"
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder="Email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="relative mt-4">
            <input
              type="password"
              id="password"
              name="password"
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder="Password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="relative ml-32">
            <h2>
              <Link href={`/forgot-password`}>Forgot Password?</Link>
            </h2>
          </div>

          <div className="flex flex-col items-center mt-4">
            <button className="mt-2 flex button-primary-color text-white rounded-3xl p-2 px-7" onClick={handleLogin}>
              LOG IN
            </button>
            <h3 className="text-center text-xs mt-2 text-gray-500">or log in with</h3>

            <div className="flex py-4 gap-3">
              <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                <FaApple />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-2 mx-1">
                <FcGoogle />
              </a>
              <a href="#" className="border-2 text-blue-900 border-gray-200 rounded-full p-2 mx-1">
                <FaFacebookF />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-center text-xs mt-2">
              Don't have an account? <Link href={`/signup`}>Sign Up</Link>
            </h3>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Login;
