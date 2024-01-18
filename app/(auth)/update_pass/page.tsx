
// import React from 'react';
// import { MdOutlineMailOutline } from 'react-icons/md';
// import { MdArrowBackIos } from "react-icons/md";
// import Link from 'next/link';

// const UpdatePassword = () => {



//   return (
    
//     <div className="flex items-center justify-center h-screen">
//       <div className="shadow-lg w-80 p-9">
      
//           <Link href="/forgot_pass">
//               <MdArrowBackIos/>
//           </Link>
//        <form>
//         <h1 className="font-bold py-5">Create new password</h1>
//         <h3 className="text-sm py-5">
//          Your new password must be different from previously used password 
//         </h3>
//         <div className="flex flex-col  items-center  overflow-hidden">
//           <div>
//           <input
//             className="w-full  border-b  outline-none focus:outline-none"
//             type="password"
//             id="password"
//             placeholder="password"
//             required
//           />
//           </div>
//         <div className='py-5'>
//            <input
//             className="w-full border-b  outline-none focus:outline-none"
//             type="password"
//             id="cnfmpassword"
//             placeholder="Confirm password"
//             required
//           />
          
//         </div>
//       </div>
//       <div className='flex justify-center'>
//       <button className="mt-10 flex  justify-center button-primary-color text-white rounded-3xl p-1 px-3">Confirm</button>
//     </div>
//     </form>
// </div>
// </div>
//   );
// };



// export default UpdatePassword;
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import Link from 'next/link';

interface UpdatePasswordProps {
  token: string;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ token }) => {
  const baseURL = "https://0e15-2405-201-f00a-882c-64fd-eda5-d757-1116.ngrok-free.app/v1";
  const URL = `${baseURL}/auth/reset-password?token=${token}`;
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setConfirmPassword(e.target.value);
  // };

  const handleConfirmClick = async (e: FormEvent) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   // Passwords don't match, handle accordingly
    //   console.error('Passwords do not match');
    //   return;
    // }

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
         
        }),
      });

      if (response.ok) {
        // Password reset successful, handle accordingly
        console.log('Password reset successful');
      } else {
        // Password reset failed, handle accordingly
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="shadow-lg w-80 p-9">
        {/* <Link href="/forgot_pass">
          <MdArrowBackIos />
        </Link> */}
        <h1 className="font-bold py-5">Create new password</h1>
        <h3 className="text-sm py-5">
          Your new password must be different from previously used password
        </h3>
        <div className="flex flex-col items-center overflow-hidden">
          <div>
            <input
              className="w-full border-b outline-none focus:outline-none"
              type="password"
              id="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
          </div>
          {/* <div className="py-5">
            <input
              className="w-full border-b outline-none focus:outline-none"
              type="password"
              id="cnfmpassword"
              placeholder="Confirm password"
              required
              onChange={handleConfirmPasswordChange}
            />
          </div> */}
        </div>
        <div className="flex justify-center">
          <button
            className="mt-10 flex justify-center button-primary-color text-white rounded-3xl p-1 px-3"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
