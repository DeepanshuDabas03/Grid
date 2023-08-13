import React, { useState } from 'react';
import Papa from 'papaparse';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import Cookies from 'js-cookie';
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
    console.log(response)
    // Verify credentials
    const user = data.find((entry) => entry.UserId === username); // Change this line
    console.log(user)
    if (user && password == 'hello') { 
      setCookie(null, 'user', JSON.stringify(user), {
        maxAge: 3600,
        path: '/collections',
      });
      Cookies.set('myCookie', username);
      console.log(Cookies.get('myCookie'))


      router.push('/collections'); // Redirect to the dashboard or protected page
    } else {
      
      alert('Invalid username or password.');
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      
      <div className="w-2/3 bg-blue-700 text-white p-12 flex flex-col justify-center items-center">
        <div className="text-4xl font-bold mb-4">
        <Typewriter 
          options={{
            strings: ["Internship", 'Lagwado'],
            autoStart: true,
            loop: true,
          }}
        />
        </div>
        <p className="text-lg text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor bibendum est,
          ultrices sodales enim efficitur id.
        </p>
      </div>
      
      {/* Right Side */}
      <div className="w-1/3 flex text-black justify-center items-center">
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
              className="bg-blue-600 hover:bg-black hover:text-blue-500 text-white font-bold py-2 px-6 rounded-lg focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
