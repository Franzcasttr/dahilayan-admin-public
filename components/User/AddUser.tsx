import { useRouter } from 'next/router';
import React, { SetStateAction, useState } from 'react';

import { API } from '../../config/API';

const AddUser = ({
  setAddUser,
}: {
  setAddUser: React.Dispatch<SetStateAction<boolean>>;
}) => {
  // const [images, setImages] = useState<FileList | null>(null);

  const { push, asPath } = useRouter();
  const [name, setName] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const dispatch = useAppDispatch();
  // const { price: ridePrice } = useAppSelector((state) => state.rides);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files;
  //   setImages(file);
  // };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAddUser(false);
    // const form = new FormData();

    const payload = {
      name,
      email,
      password,
    };
    // form.append('name', name);
    // form.append('email', email.toLocaleLowerCase());
    // form.append('password', password);

    // if (images !== null) {
    //   for (const file of images!) {
    //     form.append('image_upload', file);
    //   }
    // }

    try {
      const res = await API.post('users/createUser', payload);
      if (res.status === 200) {
        push(asPath);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=''>
        <form encType='multiplart/form-data' className='flex flex-col gap-6'>
          <label htmlFor='fname'>Full Name</label>
          <input
            className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
            type='text'
            name='firstname'
            id='fname'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor='mail'>Email</label>
          <input
            className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
            type='email'
            name='email'
            id='mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='pwrd'>Password</label>
          <input
            className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
            type='password'
            name='password'
            id='pwrd'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type='submit'
            value='Save User'
            className='cursor-pointer p-3 bg-[#dae2ed] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
            onClick={handleSubmit}
          />
        </form>

        {/* <label htmlFor='images'>Profile Photo</label>
        <input
          type='file'
          accept='image/*'
          multiple
          name='image_upload'
          id='images'
          onChange={handleChange}
          />

        <input
          type='submit'
          value='Add User'
          className='cursor-pointer text-green-400'
          onClick={handleSubmit}
          />
      </form> */}
      </div>
    </>
  );
};

export default AddUser;
