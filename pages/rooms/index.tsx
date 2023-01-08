import { GetServerSideProps } from 'next';
import { IoMdTrash } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';
import RoomImage from '../../components/Images/RoomImage';
import { API } from '../../config/API';

import { useEffect, useState } from 'react';

import Header from '../../components/Headers/Header';
import AddRoom from '../../components/Forms/AddRoom';
import EditRoom from '../../components/Forms/EditRoom';
import { roomDataTypes, roomTypes } from '../../types/RoomTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdAddChart } from 'react-icons/md';
import RoomPagination from '../../components/Pagination/RoomPagination';
import { useRouter } from 'next/router';
import {
  contentVariant,
  cotainerVariant,
  mainContentVariant,
} from '../../config/Modal';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { DeleteRooms, GetAllRooms } from '../../features/rooms/roomSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from 'firebase/auth';
import { initFirebase } from '../../firebase/firebaseApp';

const Viewrooms = () => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [roomData, setRoomData] = useState<roomDataTypes | null>(null);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [deleteRooms, setDeleteRooms] = useState('');

  const [searchRooms, setSearchRooms] = useState('');
  const { push, query, asPath, isReady } = useRouter();
  const { rooms, numOfpages } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    setConfirmation(false);
    dispatch(DeleteRooms(deleteRooms));
  };

  const [addRoom, setAddRoom] = useState<boolean>(false);

  const queryPage = Number(query.pages);
  const querySearch = query.search as string;

  const payload = {
    pages: queryPage,
    search: querySearch,
  };
  useEffect(() => {
    if (queryPage > numOfpages) {
      push(`/rooms?pages=${numOfpages}`);
    }
    if (queryPage < 1) {
      push(`/rooms?pages=1`);
    }
    if (!user) {
      push(`/auth/signin?callbackUrl=${asPath}`);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(GetAllRooms(payload));
    }
  }, [queryPage, querySearch]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/rooms?search=${searchRooms}`);
  };

  return (
    <>
      <Header title='Rooms' />
      <div className='section-center'>
        <div className=' mt-11'>
          <div className='mb-8 flex justify-end'>
            <button
              onClick={() => setAddRoom(!addRoom)}
              className='p-3 bg-gray-700  rounded-md text-white space-x-2 flex items-center'>
              <MdAddChart className='text-lg' />
              <p>Add Room</p>
            </button>
          </div>
          <div className='relative'>
            <AnimatePresence>
              {addRoom && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='modal-backdrop'
                    onClick={() => setAddRoom(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='room-content scrollbar-hide'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <div className='flex justify-end text-4xl mb-8 cursor-pointer'>
                        <AiFillCloseCircle onClick={() => setAddRoom(false)} />
                      </div>
                      <AddRoom setAddRoom={setAddRoom} />
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* delete */}
              {confirmation && (
                <>
                  <motion.div
                    variants={cotainerVariant}
                    initial='hidden'
                    animate='vissible'
                    exit='exit'
                    className='modal-backdrop'></motion.div>
                  <motion.div
                    variants={contentVariant}
                    initial='hidden'
                    animate='vissible'
                    exit='exit'
                    className='content md:w-[70vw]'>
                    <motion.div
                      variants={mainContentVariant}
                      initial='hidden'
                      animate='vissible'
                      exit='exit'
                      className='delete'>
                      <p>Are you sure you want to remove?</p>
                      <div className='flex gap-4 mt-8'>
                        <button
                          className='p-2 text-black bg-white rounded-lg cursor-pointer'
                          onClick={() => setConfirmation(false)}>
                          Cancel
                        </button>
                        <button
                          className='p-2 text-white bg-[#ff8a98] rounded-lg cursor-pointer'
                          onClick={handleDelete}>
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                </>
              )}
              {/* end of delete */}
            </AnimatePresence>
          </div>
          <div>
            <AnimatePresence>
              {openEdit && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='modal-backdrop'
                    onClick={() => setOpenEdit(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='room-content scrollbar-hide'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <div className='flex justify-end text-4xl mb-8 cursor-pointer'>
                        <AiFillCloseCircle onClick={() => setOpenEdit(false)} />
                      </div>
                      <EditRoom roomData={roomData} setOpenEdit={setOpenEdit} />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <form
            onSubmit={handleSubmit}
            className='bg-white w-full p-4 flex mb-4 rounded-lg'>
            <input
              type='text'
              placeholder='Search for rooms'
              className='w-full outline-none'
              value={searchRooms}
              onChange={(e) => setSearchRooms(e.target.value)}
            />
            <button
              className='text-gray-400'
              onClick={() => push(`/rooms?search=${searchRooms}`)}>
              Search
            </button>
          </form>
          <div className='bg-[#dae2ed] drop my-10 rounded-xl p-4 overflow-x-auto scrollbar-hide'>
            <table className='border-collapse w-full text-left'>
              <thead className='border-b-[1px] border-[#AAAAAA]'>
                <tr>
                  <th>Rooms Name</th>
                  <th>Price</th>
                  <th>Bed Type</th>
                  <th>Room Faclity</th>
                  <th>Services</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                {rooms.map((data: roomTypes, index) => {
                  const {
                    id,
                    name,
                    image_url,
                    price,
                    bedtype,
                    number_of_guests,
                    bedrooms,
                    beds,
                    bathrooms,
                    amenities,
                    // description,
                  } = data;

                  return (
                    <tr key={index} className='border-b-[1px] border-[#AAAAAA]'>
                      <td className='flex flex-col md:flex-row gap-2 items-center'>
                        <RoomImage images={image_url} />
                        <p className='text-base font-semibold'>{name}</p>
                      </td>
                      <td>{price}</td>
                      <td>
                        {bedtype.map((data, index) => {
                          return (
                            <div key={index}>
                              <p>{data},</p>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        <div className='grid grid-cols-1 md:grid-cols-[70px_minmax(70px,_1fr)]'>
                          <p>{number_of_guests} guest,</p>
                          <p>{bedrooms} bedrooms,</p>
                          <p>{beds} beds,</p>

                          <p>{bathrooms} bathroom,</p>
                        </div>
                      </td>
                      <td>
                        {/* {Object.keys(amenities)
                        .slice(0, 3)
                        .map((key: any, index) => {
                          return (
                            <div key={index}>
                              <p>{amenities[key]},</p>
                            </div>
                          );
                        })} */}
                        {amenities.slice(0, 3).map((data, index) => {
                          return (
                            <div key={index}>
                              <p>{data},</p>
                            </div>
                          );
                        })}
                        <span className='font-bold text-[1.2rem]'>...</span>
                      </td>
                      <td>
                        <div className='flex gap-4'>
                          <IoMdTrash
                            className='w-[2rem] h-[2rem] delete-btn cursor-pointer'
                            onClick={() => {
                              setConfirmation(true);
                              setDeleteRooms(id);
                            }}
                          />

                          <FaEdit
                            onClick={() => {
                              setRoomData(data);
                              setOpenEdit(true);
                            }}
                            className='w-[2rem] h-[2rem] primary-text cursor-pointer'
                          />
                        </div>
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
            <RoomPagination numberOfPages={numOfpages} pagenumber={queryPage} />
          </div>
        )}
      </div>
    </>
  );
};

export default Viewrooms;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const pages = ctx.query.pages || 1;
//   const search = ctx.query.search || '';
//   const res = await axios.get(
//     `http://domain/api/v1/admin/rooms/view?pages=${pages}&search=${search}`
//   );

//   const data = res.data.rooms;
//   const numOfpages = res.data.numberOfPages;

//   return {
//     props: {
//       data,
//       numOfpages,
//       page: +pages,
//     },
//   };
// };

// grid-cols-[70px_minmax(70px,_1fr)]
