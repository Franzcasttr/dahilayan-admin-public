import { ReactNode, useEffect, useState } from 'react';
import { RiMenuUnfoldLine } from 'react-icons/ri';
import Sidebar from './Navbar/Sidebar';
import UserProfile from './User/UserProfile';

const Layout = ({ children }: { children: ReactNode }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleSize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleSize);

    handleSize();
    return () => window.removeEventListener('resize', handleSize);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <main className='relative'>
        <div>
          <div className='hidden md:flex mt-3 md:mt-8 md:items-center  '>
            <RiMenuUnfoldLine
              className={
                toggleSidebar
                  ? 'hidden'
                  : 'mx-4 text-3xl md:ml-[2rem] md:text-4xl text-black cursor-pointer'
              }
              onClick={() => setToggleSidebar(true)}
            />

            {/* <Logo /> */}
            <p>Logo</p>
          </div>
          <div className='flex justify-between items-center section-center pt-4 md:hidden'>
            <RiMenuUnfoldLine
              className='text-4xl md:ml-[2rem] md:text-4xl text-black'
              onClick={() => setToggleSidebar(true)}
            />
            {/* <Navbar /> */}
            <UserProfile />
          </div>

          {toggleSidebar && (
            <div className={toggleSidebar ? 'block' : 'hidden md:block'}>
              <Sidebar
                setToggleSidebar={setToggleSidebar}
                screenSize={screenSize}
              />
            </div>
          )}
        </div>

        {children}
        {/* <div>Footer</div> */}
      </main>
    </>
  );
};

export default Layout;
