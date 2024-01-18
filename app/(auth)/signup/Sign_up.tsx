"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { baseURL } from '@/utils/constants';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

const Signup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

 const isValidEmail = (email: string): boolean => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signup = async (e: FormEvent) => {
    e.preventDefault();
    const baseURL = "https://0e15-2405-201-f00a-882c-64fd-eda5-d757-1116.ngrok-free.app/v1";
    const URL = `${baseURL}/auth/register`;

    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    

    try {
      const response = await axios.post(`${URL}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Successful registration', response.data);
        router.push('/');
      } else {
        setErrorMessage('Registration failed. Please check your details.');
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="shadow-lg p-6 w-80">
        <h1 className="text-xl font-sans font-bold mb-6">
          Create<br /> your account
        </h1>
        <form className="flex flex-col gap-4 font-medium text-sm p-1 ">
          <div className="relative mt-1 ">
            <input
              type="text"
              name='firstName'
              id="firstName"
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder='First Name'
              required
              onChange={handleChange}
            />
          </div>
          <div className="relative mt-1 ">
            <input
              type="text"
              name='lastName'
              id="lastName"
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder='Last Name'
              required
              onChange={handleChange}
            />
          </div>

          <div className="relative mt-1">
            <input
              type="email"
              id="email"
              name='email'
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder='Email'
              required
              onChange={handleChange}
            />
          </div>

          <div className="relative mt-1">
            <input
              type="password"
              id="password"
              name='password'
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder='Password'
              required
              onChange={handleChange}
            />
          </div>

          <div className="relative mt-1">
            <input
              type="text"
              id="address"
              name='address'
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder='Address'
              required
              onChange={handleChange}
            />
          </div>

          <div className="relative mt-1">
            <input
              type="number"
              id="phone"
              name='phone'
              className="border-b py-1 w-60 focus:outline-none focus:border-primary-color focus:border-b-2 transition-colors peer"
              autoComplete="off"
              placeholder='Phone'
              required
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col items-center mt-2'>
            <button className="mt-2 flex button-primary-color text-white rounded-3xl p-2 px-7" onClick={signup}>
              SIGN UP
            </button>
            <h3 className="text-center text-xs mt-2 text-gray-500">or sign up with</h3>

            <div className="flex py-4 gap-3">
              <a href='#' className='border-2 border-gray-200 rounded-full p-2 mx-1'>
                <FaApple />
              </a>
              <a href='#' className='border-2 border-gray-200 rounded-full p-2 mx-1'>
                <FcGoogle className='' />
              </a>
              <a href='#' className='border-2 text-blue-900 border-gray-200 rounded-full p-2 mx-1'>
                <FaFacebookF className='' />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-center text-xs ">Already have an account?{' '}
              <Link href={`/login`}>Log in</Link>
            </h3>
          </div>
        </form>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Signup;
