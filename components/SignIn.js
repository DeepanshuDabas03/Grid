import React, { useState } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import Cookies from 'js-cookie';
import Image from 'next/image'
import Typewriter from 'typewriter-effect';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/Feviews2.csv');
    const text = await response.text();
    const { data } = Papa.parse(text, { header: true });
    // Verify credentials
    const user = data.find((entry) => entry.UserId === username); // Change this line
    if (user && password == 'hello') { 
      setCookie(null, 'user', JSON.stringify(user), {
        maxAge: 3600,
        path: '/home',
      });
      Cookies.set('myCookie', username);


      router.push('/home'); // Redirect to the dashboard or protected page
    } else {
      
      alert('Invalid username or password.');
    }
  };
  

  return (
    <div className="flex h-screen">
  <div className="w-3/4 bg-[#12665F] text-white p-12 flex flex-col justify-center h-screen items-center">
    {/* Big heading with margin-top */}
    <h1 className="text-7xl mb-20  flex justify-top">Welcome to Our ChoiceCart.AI</h1>

    {/* Typewriter effect */}
    <div className="text-4xl font-bold mb-4">
      <Typewriter 
        options={{
          strings: ["Want Solution?", 'Have Recommendation'],
          autoStart: true,
          loop: true,
        }}
      />
    </div>

    <p className="text-lg text-center">
      get access to your order, wshist and Recommendations
    </p>
  </div>
      
      {/* Right Side */}

      <div className="w-1/4 flex flex-col text-black justify-center bg-white h-screen items-center">
  <form onSubmit={handleSubmit} className="grid grid-cols-1">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-black hover:bg-black hover:text-blue-500 text-white font-bold py-2 px-6 rounded-lg focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <div className='grid grid-col-1 mt-10'>
        <Image
        src = "/LAP.jpg"
        width = {400}
        height={100}
        
        />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
