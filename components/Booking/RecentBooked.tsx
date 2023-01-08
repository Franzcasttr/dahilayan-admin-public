import React from 'react';
import useSWR from 'swr';
import { API } from '../../config/API';
import { bookingList2 } from '../../types/bookingListTypes';
import BookingImage from '../Images/BookingsImage';

const fetcher = (url: string) => API.get(url).then((res) => res.data);
const RecentBooked = () => {
  const { data: bookingList, error } = useSWR(
    'bookings/getAllBookings',
    fetcher
  );

  return (
    <>
      <div className='section-center bg-[#dae2ed] drop my-10 rounded-xl p-4 overflow-x-auto'>
        <p className='text-2xl font-semibold mb-10 md:text-center'>
          Recent Booking
        </p>
        <table className='border-collapse w-full'>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date Booked</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Items Booked</th>
              <th>Paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className='text-center relative'>
            {bookingList !== undefined &&
              bookingList.bookings
                .slice(0, 5)
                .map((data: bookingList2, index: number) => {
                  const {
                    id,
                    check_in,
                    check_out,
                    paid,
                    createdAt,
                    roomBy,
                    status,
                    userBy,
                  } = data;

                  const { name } = roomBy;
                  const { name: userName, image } = userBy;
                  const date = new Date(createdAt);

                  return (
                    <tr key={index} className='border-b-[1px] border-[#AAAAAA]'>
                      <td className='flex gap-2 items-center '>
                        <BookingImage images={image} name={userName} />
                        <p className='text-base font-semibold'>{userName}</p>
                      </td>
                      <td>
                        <p>{date.toLocaleDateString()}</p>
                      </td>
                      <td>
                        <p>{check_in}</p>
                      </td>
                      <td>
                        <p>{check_out}</p>
                        {/* <p>{checkOutdate.toLocaleDateString()}</p> */}
                      </td>
                      <td>
                        <p>{name}</p>
                      </td>
                      <td>
                        <p className='text-[#FD8686]'>{paid}</p>
                      </td>
                      <td>
                        {(status === 'Pending' && (
                          <p className='text-[#FF9F40]'>{status}</p>
                        )) ||
                          (status === 'Booked' && (
                            <p className='text-[#60CBB8]'>{status}</p>
                          )) ||
                          (status === 'Cancelled' && (
                            <p className='text-[#FF6B6B]'>{status}</p>
                          )) ||
                          (status === 'Check_In' && (
                            <p className='text-[#7CBDFA]'>{status}</p>
                          )) ||
                          (status === 'Check_Out' && (
                            <p className='text-[#FC8484]'>{status}</p>
                          )) ||
                          (status === 'Completed' && (
                            <p className='text-[#60CBB8]'>{status}</p>
                          ))}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentBooked;
