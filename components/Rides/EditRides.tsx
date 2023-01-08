import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, SetStateAction, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { API } from '../../config/API';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import {
  editPrice,
  handleImages,
  removeEditPrice,
  removeImages,
} from '../../features/rides/ridesSlice';
import { IRidesTypes } from '../../types/RidesTypes';

const EditRides = ({
  editRides,
  setOpenEdit,
}: {
  editRides: IRidesTypes | null;
  setOpenEdit: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { push, asPath } = useRouter();
  const [name, setName] = useState(editRides?.name);
  const [price, setPrice] = useState(editRides?.price);
  const [desc, setDesc] = useState(editRides?.description);
  const { image_url, editPrice: editedPrice } = useAppSelector(
    (state) => state.rides
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(editPrice(editRides?.price));
    dispatch(handleImages(editRides?.image_url));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(editPrice(price));
  };
  const deleteBedType = (data: string) => {
    dispatch(removeEditPrice(data));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenEdit(false);
    const editData = {
      name,
      image_url,
      price,
      desc,
    };

    try {
      const res = await API.put(`rides/updaterides/${editRides?.id}`, editData);
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
        <label htmlFor='rooms'>Rides Name</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='text'
          placeholder='Enter Room Name'
          name='room_name'
          id='rooms'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='type'>Price</label>
        <div>
          <div className='flex gap-4'>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='text'
              placeholder='Enter Price'
              name='bedtype'
              id='bedtype'
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              required
            />
            {/* <button
              onClick={handleClick}
              className='p-2 w-24 bg-[#dae2ed] drop-shadow-7xl rounded-md font-semibold text-[#767878'>
              Add
            </button> */}
          </div>
          <div className='flex gap-4 mt-4'>
            {/* {render price} */}
            {/* {editedPrice.map((data, index) => {
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
            })} */}
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
                  layout='fixed'
                />
              </div>
            );
          })}
        </div>
        <input
          className='cursor-pointer p-3 bg-[#dae2ed] text-[#60CBB8] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
          type='submit'
          value='Update Rides'
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default EditRides;
