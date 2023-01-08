import axios from 'axios';
import { getAuth, signOut } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillCloseCircle, AiOutlineUserAdd } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import Header from '../../components/Headers/Header';
import UserImages from '../../components/Images/UserImages';
import Paginate from '../../components/Pagination/Paginate';
import AddUser from '../../components/User/AddUser';
import EditUser from '../../components/User/EditUser';
import { API } from '../../config/API';
import {
  contentVariant,
  cotainerVariant,
  mainContentVariant,
} from '../../config/Modal';
import { initFirebase } from '../../firebase/firebaseApp';
import { IUserTypes, ListTypes } from '../../types/userListTypes';

const ListOfUsers: FC<ListTypes> = ({
  userData,
  numOfpages,
  page: pagenum,
}) => {
  initFirebase();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [searchUser, setSearchUser] = useState<string | undefined>('');
  const [userValue, setUserValue] = useState<IUserTypes | null>(null);
  const [deleteUsers, setDeleteUsers] = useState('');
  const [confirmation, setConfirmation] = useState<boolean>(false);
  // const { data: session } = useSession();

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

  const queryPage = Number(query.pages);
  useEffect(() => {
    if (queryPage > numOfpages) {
      push(`/users?pages=${numOfpages}`);
    }
    if (queryPage < 1) {
      push(`/users?pages=1`);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      push(`/auth/signin?callbackUrl=${asPath}`);
    }
  }, []);

  const handleDelete = async () => {
    setConfirmation(false);
    const res = await API.delete(`users/deleteuser/${deleteUsers}`);

    if (res.status === 200) {
      push(asPath);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/users?search=${searchUser}`);
  };
  return (
    <>
      <Header title='User' />
      <div className='section-center'>
        <p className='text-center text-2xl font-semibold'>User List</p>
        <div className='mt-11'>
          <div className='mb-8 flex justify-end'>
            <button
              onClick={() => setAddUser(!addUser)}
              className='p-3 bg-gray-700  rounded-md text-white space-x-2 flex items-center'>
              <AiOutlineUserAdd className='text-lg' />
              <p>Add user</p>
            </button>
          </div>
          <div className='relative'>
            <AnimatePresence>
              {addUser && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='modal-backdrop'
                    onClick={() => setAddUser(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='user-content'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <div className='flex justify-end text-4xl mb-8 cursor-pointer'>
                        <AiFillCloseCircle onClick={() => setAddUser(false)} />
                      </div>
                      <AddUser setAddUser={setAddUser} />
                    </motion.div>
                  </motion.div>
                  {/* <AddUser /> */}
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
              {openEdit && userValue !== null && (
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
                    className='user-content'>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <div className='flex justify-end text-4xl mb-8 cursor-pointer'>
                        <AiFillCloseCircle onClick={() => setOpenEdit(false)} />
                      </div>
                      <EditUser
                        editUser={userValue}
                        setOpenEdit={setOpenEdit}
                      />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className='bg-white w-full p-4 flex mb-4 rounded-lg'>
          <input
            type='text'
            placeholder='Search for user'
            className='w-full outline-none'
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button
            className='text-gray-400'
            onClick={() => push(`/users?search=${searchUser}`)}>
            Search
          </button>
        </form>

        <div className='bg-[#dae2ed] drop my-10 rounded-xl p-4 overflow-x-auto scrollbar-hide'>
          <table className='border-collapse w-full '>
            <thead className='border-b-[1px] border-[#AAAAAA] pb-2'>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody className='text-left'>
              {userData.map((data, index) => {
                const {
                  id,
                  name,
                  date_of_birth,
                  gender,
                  email,
                  phone_number,
                  image,
                } = data;

                return (
                  <tr key={index} className='border-b-[1px] border-[#AAAAAA]'>
                    <td>
                      <UserImages images={image} />
                    </td>
                    <td>
                      <p className='text-base font-semibold'>{name}</p>
                    </td>

                    <td>
                      {date_of_birth ? (
                        <p>{date_of_birth}</p>
                      ) : (
                        <p>Not Specified</p>
                      )}
                    </td>

                    <td>
                      {gender ? (
                        <p className='capitalize'>{gender}</p>
                      ) : (
                        <p>Not Specified</p>
                      )}
                    </td>
                    <td>
                      <p>{email}</p>
                    </td>
                    <td>
                      {phone_number ? (
                        <p>{phone_number}</p>
                      ) : (
                        <p>Not Specified</p>
                      )}
                      <p>{phone_number}</p>
                    </td>
                    <td>
                      <div className='flex gap-4'>
                        <IoMdTrash
                          className='w-[2rem] h-[2rem] delete-btn cursor-pointer'
                          onClick={() => {
                            setConfirmation(true);
                            setDeleteUsers(id);
                          }}
                        />

                        <FaEdit
                          onClick={() => {
                            setUserValue(data);
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
            <Paginate numberOfPages={numOfpages} pagenumber={pagenum} />
          </div>
        )}
      </div>
    </>
  );
};

export default ListOfUsers;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pages = ctx.query.pages || 1;
  const search = ctx.query.search || '';

  const res = await API.get(
    `users/getAllUsers?pages=${pages}&search=${search}`
  );
  const user = res.data.user;
  const numOfpages = res.data.numberOfPages;

  return {
    props: {
      userData: user,
      numOfpages,
      page: +pages,
    },
  };
};
