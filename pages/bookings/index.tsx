import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiDotsHorizontal } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import Header from '../../components/Headers/Header';
import BookingImage from '../../components/Images/BookingsImage';
import BookingPaginate from '../../components/Pagination/BookingPaginate';
import { API } from '../../config/API';
import { initFirebase } from '../../firebase/firebaseApp';
import { bookingList } from '../../types/bookingListTypes';
import { formatter } from '../../utils/format';

const BookingList: FC<bookingList> = ({
  bookingList,
  numOfpages,
  page: pagenum,
}) => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [updateModal, setUpdateModal] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const { push, query, asPath } = useRouter();

  const queryPage = Number(query.pages);
  useEffect(() => {
    if (queryPage > numOfpages) {
      push(`/bookings?pages=${numOfpages}`);
    }
    if (queryPage < 1) {
      push(`/bookings?pages=1`);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      push(`/auth/signin?callbackUrl=${asPath}`);
    }
  }, []);

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

  // const handleSubmit = async (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   const bookingsData = {
  //     userID: '1dca1be5-4b49-4741-9521-aa64c357debc',
  //     check_in: '10/06/2022',
  //     check_out: '10/10/2022',
  //     room_type: '3d9c11ee-6a3d-48af-8ef4-6471d9ad6d35',
  //     paid: 45000,
  //   };

  //   await API.post('api/bookings/create', bookingsData);
  // };

  const handleEdit = async (data: string, id: string) => {
    const statusData = {
      status: data,
    };
    try {
      const res = await API.put(`bookings/updateBooking/${id}`, statusData);
      if (res.status === 200) {
        push(asPath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title='Booking List' />
      <div className='section-center'>
        <div className='mt-11'>
          {/* <div className='b-8 flex justify-end'>
            <button
              onClick={handleSubmit}
              className='p-4 bg-slate-400 rounded-md text-white'>
              Add Bookings
            </button>
          </div> */}
          <div className='bg-[#dae2ed] drop my-10 rounded-xl p-4 overflow-x-auto'>
            <table className='border-collapse w-full '>
              <thead className='border-b-[1px] border-[#AAAAAA] pb-2 font-semibold text-lg'>
                <tr>
                  <th>Customer</th>
                  <th>Date Booked</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Items Booked</th>
                  <th>Paid</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center relative'>
                {bookingList.map((data, index) => {
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
                  // const checkIndate = new Date(check_in);
                  // const checkOutdate = new Date(check_out);

                  return (
                    <tr
                      key={index}
                      className='border-b-[1px] border-[#c2c2c2] hover:bg-[#CBD4E5]'>
                      <td className='flex gap-2 items-center'>
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
                        <p className='text-[#FD8686]'>{formatter(paid)}</p>
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

                      <td>
                        {updateModal && bookingId === id && (
                          <div className='absolute z-20 p-4 bg-[#dae2ed] right-16 flex gap-6 rounded-md drop-shadow-8xl top-3'>
                            <button
                              className='text-[#FF9F40] cursor-pointer'
                              onClick={() => {
                                setUpdateModal(false);
                                handleEdit('Pending', id);
                              }}>
                              Pending
                            </button>
                            <button
                              className='text-[#60CBB8] cursor-pointer'
                              onClick={() => {
                                setUpdateModal(false);
                                handleEdit('Booked', id);
                              }}>
                              Book
                            </button>
                            <button
                              className='text-[#FF6B6B] cursor-pointer'
                              onClick={() => {
                                setUpdateModal(false);
                                handleEdit('Cancelled', id);
                              }}>
                              Cancel
                            </button>
                            <button
                              className='text-[#7CBDFA] cursor-pointer'
                              onClick={() => {
                                setUpdateModal(false);
                                handleEdit('Check_In', id);
                              }}>
                              Check In
                            </button>
                            <button
                              className='text-[#FC8484] cursor-pointer'
                              onClick={() => {
                                setUpdateModal(false);
                                handleEdit('Check_Out', id);
                              }}>
                              Check Out
                            </button>
                            <button
                              className='text-[#60CBB8] cursor-pointer'
                              onClick={() => {
                                setUpdateModal(false);
                                handleEdit('Completed', id);
                              }}>
                              Complete
                            </button>
                            <button
                              className='cursor-pointer'
                              onClick={() => setUpdateModal(false)}>
                              <IoMdClose className='text-2xl text-red-400' />
                            </button>
                          </div>
                        )}
                        <button
                          className='text-3xl text-blue-400'
                          onClick={() => {
                            setUpdateModal(!updateModal);
                            setBookingId(id);
                          }}>
                          <HiDotsHorizontal />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {numOfpages > 1 && (
          <div className='my-10'>
            <BookingPaginate numberOfPages={numOfpages} pagenumber={pagenum} />
          </div>
        )}
      </div>
    </>
  );
};

export default BookingList;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages = ctx.query.pages || 1;
  const res = await API.get(`bookings/getAllBookings?pages=${pages}`);
  const bookingList = res.data.bookings;
  const numOfpages = res.data.numberOfPages;

  return {
    props: {
      bookingList,
      numOfpages,
      page: +pages,
    },
  };
};
