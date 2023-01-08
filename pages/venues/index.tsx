import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { MdOutlineLibraryAdd } from 'react-icons/md';
import Header from '../../components/Headers/Header';
import VenueImage from '../../components/Images/VenueImage';
import AddVenue from '../../components/Venue/AddVenue';
import EditVenue from '../../components/Venue/EditVenue';
import VenuePagination from '../../components/Pagination/VenuePagination';
import { API } from '../../config/API';
import {
  contentVariant,
  cotainerVariant,
  mainContentVariant,
} from '../../config/Modal';
import { IVenueTypes, VenueTypes } from '../../types/VenueTypes';
import { initFirebase } from '../../firebase/firebaseApp';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const ListOfVenues: React.FC<VenueTypes> = ({ venues, numOfpages, page }) => {
  initFirebase();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [addVenue, setAddVenue] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editVenue, setEditVenue] = useState<IVenueTypes | null>(null);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [deleteVenue, setDeleteVenue] = useState('');
  const [searchRooms, setSearchRooms] = useState('');
  const { push, query, asPath } = useRouter();

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
    const res = await API.delete(`venues/deleteVenue/${deleteVenue}`);

    if (res.status === 200) {
      push('/venues');
    }
  };

  const queryPage = Number(query.pages);
  useEffect(() => {
    if (queryPage > numOfpages) {
      push(`/venues?pages=${numOfpages}`);
    }
    if (queryPage < 1) {
      push(`/venues?pages=1`);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      push(`/auth/signin?callbackUrl=${asPath}`);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/venues?search=${searchRooms}`);
  };
  return (
    <>
      <Header title='Venues' />
      <div className='section-center'>
        <div className='mt-11'>
          <div className='mb-8 flex justify-end'>
            <button
              onClick={() => setAddVenue(!addVenue)}
              className='p-3 bg-gray-700  rounded-md text-white space-x-2 flex items-center'>
              <MdOutlineLibraryAdd className='text-lg' />
              <p>Add venue</p>
            </button>
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
          <AnimatePresence>
            {addVenue && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='modal-backdrop'
                  onClick={() => setAddVenue(false)}
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
                      <AiFillCloseCircle onClick={() => setAddVenue(false)} />
                    </div>
                    <AddVenue setAddVenue={setAddVenue} />
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
                      <EditVenue
                        editVenue={editVenue}
                        setOpenEdit={setOpenEdit}
                      />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='bg-[#dae2ed] drop my-10 rounded-xl p-4 overflow-x-auto scrollbar-hide'>
          <table className='border-collapse w-full text-left'>
            <thead className='border-b-[1px] border-[#AAAAAA] pb-2'>
              <tr>
                <th>Rides Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='text-left'>
              {venues.map((data, index) => {
                const { id, name, description, services, image_url } = data;

                return (
                  <tr key={index} className='border-b-[1px] border-[#AAAAAA]'>
                    <td className='flex flex-col md:flex-row gap-2 items-center'>
                      <VenueImage images={image_url} />
                      <p className='text-base font-semibold'>{name}</p>
                    </td>

                    <td>
                      {services.map((data, index) => {
                        return (
                          <div key={index}>
                            <p>{data},</p>
                          </div>
                        );
                      })}
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
                            setDeleteVenue(id);
                          }}
                        />

                        <FaEdit
                          onClick={() => {
                            setEditVenue(data);
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
        {numOfpages > 1 && (
          <div className='my-10'>
            <VenuePagination numberOfPages={numOfpages} pagenumber={page} />
          </div>
        )}
      </div>
    </>
  );
};

export default ListOfVenues;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages = ctx.query.pages || 1;
  const search = ctx.query.search || '';
  const res = await API.get(
    `venues/getAllVenue?pages=${pages}&search=${search}`
  );
  const venues = res.data.venues;
  const numOfpages = res.data.numberOfPages;
  return {
    props: {
      venues,
      numOfpages,
      page: +pages,
    },
  };
};
