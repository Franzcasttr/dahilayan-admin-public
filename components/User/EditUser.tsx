import { useRouter } from 'next/router';
import React, { FC, SetStateAction, useState } from 'react';
import { API } from '../../config/API';
import { IUserEditTypes } from '../../types/userListTypes';
// import { useAppDispatch } from '../../features/app/hook';

const EditUser: FC<IUserEditTypes> = ({ editUser, setOpenEdit }) => {
  const { push, asPath } = useRouter();
  const [name, setName] = useState<string>(editUser.name);
  const [date_of_birth, setDate_of_birth] = useState<string>(
    editUser.date_of_birth
  );
  const [gender, setGender] = useState<string>(editUser.gender);
  const [email, setEmail] = useState<string>(editUser.email);
  const [password, setPassword] = useState<string | undefined>('');
  const [phone_number, setPhone_number] = useState<number>(
    editUser.phone_number
  );

  const handleSubmit = async (e: React.MouseEvent) => {
    setOpenEdit(false);
    e.preventDefault();
    const editData = {
      name,
      date_of_birth,
      gender,
      email,
      password,
      phone_number,
    };

    try {
      const res = await API.put(`users/updateuser/${editUser?.id}`, editData);
      if (res.status === 200) {
        push(asPath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=''>
      <form encType='multiplart/form-data' className='flex flex-col gap-6'>
        <label htmlFor='fname'>First Name</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='text'
          name='first_name'
          id='fname'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='birth'>Date of birth</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='text'
          name='date_of_birth'
          id='birth'
          value={date_of_birth || 'Not Specified'}
          onChange={(e) => setDate_of_birth(e.target.value)}
        />
        <label htmlFor='gender'>Gender</label>
        <select
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          name='gender'
          id='gender'
          value={gender || undefined}
          onChange={(e) => setGender(e.target.value)}>
          <option value='male'>Not Specified</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>

        <label htmlFor='mail'>Email</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='email'
          name='email'
          id='mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='mail'>Password</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='email'
          name='email'
          id='mail'
          value={password}
          placeholder='Change Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='num'>Phone Number</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='number'
          name='phone_number'
          id='num'
          placeholder='+63'
          value={phone_number || undefined}
          onChange={(e) => setPhone_number(parseInt(e.target.value))}
        />

        <input
          type='submit'
          value='Update User'
          className='cursor-pointer text-[#60CBB8] p-3 bg-[#dae2ed] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default EditUser;
