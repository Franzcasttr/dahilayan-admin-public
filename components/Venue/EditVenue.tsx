import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, SetStateAction, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { API } from '../../config/API';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';

import {
  handleImages,
  removeImages,
  removeServices,
  updateServices,
} from '../../features/venues/venueSlice';
import { IVenueTypes } from '../../types/VenueTypes';

const EditVenue = ({
  editVenue,
  setOpenEdit,
}: {
  editVenue: IVenueTypes | null;
  setOpenEdit: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { push, asPath } = useRouter();
  const [name, setName] = useState(editVenue?.name);
  const [services, setServices] = useState<string | undefined>();
  const [description, setDescription] = useState(editVenue?.description);
  const { image_url, editServices } = useAppSelector((state) => state.venue);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateServices(editVenue?.services));
    dispatch(handleImages(editVenue?.image_url));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(updateServices(services));
  };
  const deleteBedType = (data: string) => {
    dispatch(removeServices(data));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenEdit(false);
    const editData = {
      name,
      image_url,
      editServices,
      description,
    };

    try {
      const res = await API.put(
        `venues/updateVenue/${editVenue?.id}`,
        editData
      );
      if (res.status === 200) {
        push(asPath);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className='flex flex-col gap-6'>
        {/* end of images */}
        <label htmlFor='rooms'>Room Name</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='text'
          placeholder='Enter Room Name'
          name='room_name'
          id='rooms'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='type'>Services</label>
        <div>
          <div className='flex gap-4'>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='text'
              name='bedtype'
              id='bedtype'
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
            {/* {bedtypes} */}
            {editServices.map((data, index) => {
              return (
                <div
                  key={index}
                  className='flex gap-1 items-center p-2 bg-[#6C749D] rounded-full text-white'>
                  <IoMdClose
                    className='text-xl text-white cursor-pointer'
                    onClick={() => deleteBedType(data)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {/* images */}
        <label htmlFor=''>Images</label>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
          {image_url.map((data: any, index: any) => {
            return (
              <div key={index} className=''>
                <IoMdClose
                  className='text-2xl text-white cursor-pointer z-50 absolute'
                  onClick={() => dispatch(removeImages(data.url))}
                />
                <Image
                  className='rounded-md relative'
                  src={data.url}
                  alt='Dahilayan'
                  width={118}
                  height={80}
                />
              </div>
            );
          })}
        </div>
        <input
          type='submit'
          value='Update Venue'
          className='cursor-pointer p-3 bg-[#dae2ed] text-[#60CBB8] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default EditVenue;
