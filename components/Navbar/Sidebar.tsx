import React, { FC } from 'react';

// import Logo from '../Logo';

import { GiExitDoor } from 'react-icons/gi';
import { motion } from 'framer-motion';

import { useRouter } from 'next/router';
import { NavData } from '../../assets/navbarData';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { initFirebase } from '../../firebase/firebaseApp';
import { getAuth, signOut } from 'firebase/auth';

interface IsidebarToogle {
  setToggleSidebar: any;
  screenSize: any;
}

const Sidebar: FC<IsidebarToogle> = ({ setToggleSidebar, screenSize }) => {
  initFirebase();
  const auth = getAuth();
  const { replace, pathname } = useRouter();

  const handleClick = async () => {
    signOut(auth);
    setToggleSidebar(false);
    replace('/auth/signin');
  };

  return (
    <motion.div
      initial={{ x: -6 }}
      animate={{ x: 1 }}
      className='flex flex-col fixed top-0 left-0 h-full w-[13rem] p-4 bg-gray-700 text-gray-300 md:w-[15rem] md:p-9 md:border-r-[1px] z-40'>
      <div className='flex justify-between text-3xl md:text-4xl font-bold mb-4 text-[#f76072]'>
        <div></div>
        <IoClose
          onClick={() => setToggleSidebar(false)}
          className=' cursor-pointer '
        />
      </div>
      <div className='p-3 md:mb-4  md:block'>
        <p>Logo</p>
      </div>

      {NavData.map((data, index) => {
        const { name, link, icon } = data;

        return (
          <div key={index}>
            <Link href={link}>
              <a
                onClick={() => {
                  if (screenSize <= 900) {
                    setToggleSidebar(false);
                  } else {
                    setToggleSidebar(true);
                  }
                }}
                className={
                  pathname === link
                    ? 'flex gap-2 md:gap-4 p-3 text-white bg-[#f76072] font-bold rounded-xl'
                    : 'flex gap-2 md:gap-4 p-3'
                }>
                <div className='text-xl'>{icon}</div>
                <span>{name}</span>
              </a>
            </Link>
          </div>
        );
      })}
      <div className='flex gap-2  font-bold p-3 mt-6 bg-slate-600 rounded-lg'>
        <GiExitDoor className='text-white text-xl' />
        <button className='text-white' onClick={handleClick}>
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
