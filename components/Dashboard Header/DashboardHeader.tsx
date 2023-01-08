import axios from 'axios';
import React from 'react';
import { IoBookmarksOutline } from 'react-icons/io5';
import { RiGroup2Fill } from 'react-icons/ri';
import { TbDoorEnter, TbDoorExit } from 'react-icons/tb';
import useSWR from 'swr';
import { API } from '../../config/API';
import { bookingStatus } from '../../types/bookingListTypes';

const fetcher = (url: string) => API.get(url).then((res) => res.data);
const DashboardHeader = () => {
  const { data, error } = useSWR('bookings/getAllBookings', fetcher);
  const { data: bookingStatus, error: bookingError } = useSWR(
    'bookings/getCheckInOutCount',
    fetcher
  );
  const { data: users, error: userError } = useSWR(
    'users/getAllUsers',
    fetcher
  );

  return (
    <div className=' flex flex-col gap-4  md:grid md:grid-cols-4 md:gap-8 overflow-x-auto'>
      <div className='p-4 md:p-8 bg-[#88AFFB] rounded-lg'>
        <div className='flex justify-end'>
          <IoBookmarksOutline className='text-4xl text-white ' />
        </div>
        <div>
          <p className='font-semibold text-2xl text-white'>
            {data !== undefined && data.totalBookings}
          </p>
          <p className='font-semibold text-white'>Bookings</p>
        </div>
      </div>
      <div className='p-4 md:p-8 bg-[#60CBB8] rounded-lg'>
        <div className='flex justify-end'>
          <RiGroup2Fill className='text-4xl text-white' />
        </div>
        <div>
          <p className='font-semibold text-2xl text-white'>
            {users !== undefined && users.user.length}
          </p>
          <p className='font-semibold text-white'>Users</p>
        </div>
      </div>
      <div className='p-4 md:p-8 bg-[#7CBDFA] rounded-lg'>
        <div className='flex justify-end'>
          <TbDoorEnter className='text-4xl text-white' />
        </div>
        <div>
          <p className='font-semibold text-2xl text-white'>
            {bookingStatus !== undefined &&
              bookingStatus.result.map(
                (status: bookingStatus) => status.CHECKIN
              )}
          </p>
          <p className='font-semibold text-white'>Total Check In</p>
        </div>
      </div>
      <div className='p-4 md:p-8 bg-[#FC8484] rounded-lg'>
        <div className='flex justify-end'>
          <TbDoorExit className='text-4xl text-white' />
        </div>
        <div>
          <p className='font-semibold text-2xl text-white'>
            {bookingStatus !== undefined &&
              bookingStatus.result.map(
                (status: bookingStatus) => status.CHECKOUT
              )}
          </p>
          <p className='font-semibold text-white'>Total Check Out</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
