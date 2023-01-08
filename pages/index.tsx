import { getAuth, signOut } from 'firebase/auth';
import type { NextPage } from 'next';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import CheckInGraph from '../components/Booking/CheckInGraph';
import DoughnutChart from '../components/Booking/DoughnutChart';
import RecentBooked from '../components/Booking/RecentBooked';
import DashboardHeader from '../components/Dashboard Header/DashboardHeader';

import Sales from '../components/Sales/Sales';
import { initFirebase } from '../firebase/firebaseApp';

const Home: NextPage = () => {
  initFirebase();
  const { push, query } = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  // user?.getIdTokenResult().then((Usertoken) => {
  //   if (!Usertoken.claims.SuperAdmin) {
  //     setTimeout(() => {
  //       signOut(auth);
  //       push('/auth/signin');
  //     }, 2000);
  //     return (
  //       <div className='section-center'>
  //         <div className='text-center mt-32'>
  //           <h1 className='text-xl font-semibold'>
  //             You are not allowed to access this page
  //           </h1>
  //         </div>
  //       </div>
  //     );
  //   }
  // });

  useEffect(() => {
    if (!user) {
      push('/auth/signin');
    }
  }, []);

  // if (user) {
  //   setTimeout(() => {
  //     signOut();
  //     push('/auth/signin');
  //   }, 2000);
  //   return (
  //     <div className='section-center'>
  //       <div className='text-center mt-32'>
  //         <h1 className='text-xl font-semibold'>
  //           You are not allowed to access this page
  //         </h1>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <>
      <Head>
        <title>Dahilayan</title>
        <meta name='description' content='Created by Francis Castro' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='section-center'>
        <div className='my-10'>
          <DashboardHeader />
        </div>
        <div className='bg-[#dae2ed] drop-shadow-7xl mt-10 p-4 rounded-xl'>
          <Sales />
        </div>

        <div className='mt-10 md:flex md:justify-between md:gap-8 '>
          <div className='bg-[#dae2ed] drop-shadow-7xl mt-10 md:mt-0 p-4 rounded-xl w-[100%]'>
            <CheckInGraph />
          </div>
          <div className='bg-[#dae2ed] drop-shadow-7xl mt-10 md:mt-0 p-4 rounded-xl'>
            <DoughnutChart />
          </div>
        </div>
        <div className='my-10'>
          <RecentBooked />
        </div>
      </div>
    </>
  );
};

export default Home;
