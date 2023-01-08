import React, { ChangeEvent, SetStateAction, useState } from 'react';

import { API } from '../../config/API';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';

import { IoMdClose } from 'react-icons/io';
import {
  addVenueServices,
  removeVenueServices,
} from '../../features/venues/venueSlice';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddVenue = ({
  setAddVenue,
}: {
  setAddVenue: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { push, asPath } = useRouter();

  const [images, setImages] = useState<FileList | null>(null);

  const [name, setName] = useState<string>('');
  const [services, setServices] = useState<string>('');

  const [desc, setDesc] = useState('');

  const dispatch = useAppDispatch();
  const { services: venueServices } = useAppSelector((state) => state.venue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    setImages(file);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addVenueServices(services));
  };
  const deleteServices = (data: string) => {
    dispatch(removeVenueServices(data));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAddVenue(false);
    const form = new FormData();

    if (images !== null) {
      for (const file of images!) {
        form.append('image_upload', file);
      }
    }
    form.append('name', name);

    venueServices.forEach((tag: string) => {
      form.append('services', tag);
    });
    form.append('description', desc);

    // form.append('amenities', JSON.stringify(amenities));

    try {
      const res = await API.post('venues/createVenue', form);

      if (res.status === 201) {
        push(asPath);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=''>
      <form encType='multiplart/form-data' className='flex flex-col gap-6'>
        <div className='flex justify-center items-center w-full'>
          <label
            htmlFor='dropzone-file'
            className='flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
            {/* className='flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'> */}
            <div className='flex flex-col justify-center items-center pt-5 pb-6'>
              <svg
                aria-hidden='true'
                className='mb-3 w-10 h-10 text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'></path>
              </svg>
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                SVG, PNG, JPG
              </p>
            </div>
            <input
              id='dropzone-file'
              type='file'
              multiple
              className='hidden'
              onChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor='rides'>Venue Name</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='text'
          placeholder='Enter rides name'
          name='name'
          id='rides'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor='services'>Services</label>
        <div>
          <div className='flex gap-4'>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='text'
              name='services'
              id='services'
              placeholder='Enter services'
              value={services}
              onChange={(e) => setServices(e.target.value)}
              required
            />
            <button
              className='p-2 w-24 bg-[#dae2ed] drop-shadow-7xl rounded-md font-semibold text-[#767878'
              onClick={handleClick}>
              Add
            </button>
          </div>
          <div className='flex gap-4 mt-4'>
            {venueServices.map((data, index) => {
              return (
                <div
                  key={index}
                  className='flex gap-1 items-center p-2 bg-[#6C749D] rounded-full text-white'>
                  <IoMdClose
                    className='text-xl text-white cursor-pointer'
                    onClick={() => deleteServices(data)}
                  />
                  <p>{data}</p>
                </div>
              );
            })}
          </div>
        </div>

        <textarea
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-24'
          name='description'
          placeholder='Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          type='submit'
          value='Save Venue'
          className='cursor-pointer p-3 bg-[#dae2ed] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddVenue;
