import Link from 'next/link';
import React from 'react';

import Header from '../components/Headers/Header';

const CustomNotFound = () => {
  return (
    <>
      <Header title='404 Not Found' />
      <div className='section-center'>
        <h1 className='text-[10rem] font-bold text-center'>404</h1>
        <div>
          <p className='text-4xl text-center'>Oops! Page can&apos;t be found</p>
          <p className='text-center mt-4'>
            This page doesn&apos;t exist or was removed! We suggest you back to
            home
          </p>
        </div>
        <div className='w-fit h-fit mx-auto mt-8'>
          <Link href='/'>
            <a className='p-4 text-white bg-gray-600 rounded-2xl'>
              Back to home
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CustomNotFound;
