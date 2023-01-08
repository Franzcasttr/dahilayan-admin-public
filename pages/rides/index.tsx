import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { CgPlayListAdd } from 'react-icons/cg';
import Header from '../../components/Headers/Header';
import RidesImage from '../../components/Images/RidesImage';
import RidesPagination from '../../components/Pagination/RidesPagination';
import AddRides from '../../components/Rides/AddRides';
import EditRides from '../../components/Rides/EditRides';
import { API } from '../../config/API';
import {
  contentVariant,
  cotainerVariant,
  mainContentVariant,
} from '../../config/Modal';
import { IRidesTypes, RidesTypes } from '../../types/RidesTypes';
import { initFirebase } from '../../firebase/firebaseApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const Rides: React.FC<RidesTypes> = ({ rides, numOfpages, page }) => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [addRides, setAddRides] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [deleteRides, setDeleteRides] = useState('');
  const [editRides, setEditRides] = useState<IRidesTypes | null>(null);
  const [searchRides, setSearchRides] = useState('');

  const { push, query, asPath } = useRouter();

  const queryPage = Number(query.pages);
  useEffect(() => {
    if (queryPage > numOfpages) {
      push(`/rides?pages=${numOfpages}`);
    }
    if (queryPage < 1) {
      push(`/rides?pages=1`);
    }
  }, []);

  useEffect(() => {
    if (!user) {
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

  const handleDelete = async () => {
    setConfirmation(false);
    const res = await API.delete(`rides/deleterides/${deleteRides}`);
    if (res.status === 200) {
      push(asPath);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/rides?search=${searchRides}`);
  };
  return (
    <>
      <Header title='Rides' />
      <div className='section-center'>
        <div className='mt-11'>
          <div className='mb-8 flex justify-end'>
            <button
              onClick={() => setAddRides(!addRides)}
              className='p-3 bg-gray-700  rounded-md text-white space-x-2 flex items-center'>
              <CgPlayListAdd className='text-lg' />
              <p>Add rides</p>
            </button>
          </div>
          <AnimatePresence>
            {addRides && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='modal-backdrop'
                  onClick={() => setAddRides(false)}
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
                      <AiFillCloseCircle onClick={() => setAddRides(false)} />
                    </div>
                    <AddRides setAddRides={setAddRides} />
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
                      <EditRides
                        editRides={editRides}
                        setOpenEdit={setOpenEdit}
                      />
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
              placeholder='Search for rides'
              className='w-full outline-none'
              value={searchRides}
              onChange={(e) => setSearchRides(e.target.value)}
            />
            <button
              className='text-gray-400'
              onClick={() => push(`/rides?search=${searchRides}`)}>
              Search
            </button>
          </form>
          <div className='bg-[#dae2ed] drop my-10 rounded-xl p-4 overflow-x-auto scrollbar-hide'>
            <table className='border-collapse w-full text-left'>
              <thead className='border-b-[1px] border-[#AAAAAA]'>
                <tr>
                  <th>Rides Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-left'>
                {rides.map((data, index) => {
                  const { id, name, description, image_url, price } = data;

                  return (
                    <tr key={index} className='border-b-[1px] border-[#AAAAAA]'>
                      <td className='flex flex-col md:flex-row gap-2 items-center'>
                        <RidesImage images={image_url} />
                        <p className='text-base font-semibold'>{name}</p>
                      </td>

                      <td>
                        <p>{price}</p>
                      </td>

                      <td>
                        <p>{description.substring(0, 20)}</p>
                      </td>
                      <td>
                        <div className='flex gap-4'>
                          <IoMdTrash
                            className='w-[2rem] h-[2rem] delete-btn cursor-pointer'
                            onClick={() => {
                              setConfirmation(true);
                              setDeleteRides(id);
                            }}
                          />

                          <FaEdit
                            onClick={() => {
                              setEditRides(data);
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
            <RidesPagination numberOfPages={numOfpages} pagenumber={page} />
          </div>
        )}
      </div>
    </>
  );
};

export default Rides;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages = ctx.query.pages || 1;
  const search = ctx.query.search || '';
  const res = await API.get(
    `rides/getallrides?pages=${pages}&search=${search}`
  );
  const rides = res.data.rides;
  const numOfpages = res.data.numberOfPages;
  return {
    props: {
      rides,
      numOfpages,
      page: +pages,
    },
  };
};
