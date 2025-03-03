import React from 'react';
import { Link } from 'react-router-dom'; 
// import error from '../assets/sing in/illustration_404.svg';
const Error = () => {
  return (
    <div className="relative min-h-screen  text-white">
      <div className="flex flex-col items-center justify-center min-h-screen pt-16 pb-8">
        <h1 className="text-4xl text-gray-700 font-bold mb-4">Sorry, page not found!</h1>
        <p className="text-lg mb-8 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.
        </p>
        {/* <img
          src={error}
          alt="404 Illustration"
          className="mx-auto h-64 mb-8"
        /> */}
        <Link
          to="/"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
