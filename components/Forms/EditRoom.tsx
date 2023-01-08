import Image from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';

import { API } from '../../config/API';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import {
  editBedType,
  editRoomAmenities,
  handleImages,
  removeEditAmenities,
  removeEditBedType,
  removeImages,
  UpdateRoom,
} from '../../features/rooms/roomSlice';
import { roomDataTypes } from '../../types/RoomTypes';

const EditRoom = ({
  roomData,
  setOpenEdit,
}: {
  roomData: roomDataTypes | null;
  setOpenEdit: React.Dispatch<SetStateAction<boolean>>;
}) => {
  // console.log(roomData);

  const [name, setName] = useState(roomData?.name);
  const [price, setPrice] = useState(roomData?.price);
  const [number_of_guests, setNumber_of_guests] = useState(
    roomData?.number_of_guests
  );
  const [bedrooms, setBedrooms] = useState(roomData?.bedrooms);
  const [beds, setBeds] = useState(roomData?.beds);
  const [bathrooms, setBathrooms] = useState(roomData?.bathrooms);
  const [bedtype, setBedtype] = useState<string | undefined>();
  const [desc, setDesc] = useState(roomData?.description);
  const dispatch = useAppDispatch();
  const { editRoom, image_url, editAmenities } = useAppSelector(
    (state) => state.rooms
  );

  let imageData: string;
  const imagesURL = roomData?.image_url.map((data) => {
    const { url }: any = data;
    imageData = url;

    return data;
  });

  useEffect(() => {
    dispatch(editBedType(roomData?.bedtype));
    dispatch(handleImages(imageData));
    dispatch(editRoomAmenities(roomData?.amenities));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(editBedType(bedtype));
  };
  const deleteBedType = (data: string) => {
    dispatch(removeEditBedType(data));
  };
  const removeAmenities = (data: string) => {
    dispatch(removeEditAmenities(data));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    setOpenEdit(false);
    e.preventDefault();
    const editData = {
      name,
      image_url,
      price,
      editRoom,
      number_of_guests,
      bedrooms,
      beds,
      bathrooms,
      editAmenities,
      desc,
      roomId: roomData?.id,
    };

    dispatch(UpdateRoom(editData));
  };
  return (
    <div className=''>
      <form encType='multiplart/form-data' className='flex flex-col gap-6'>
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
        <label htmlFor='price'>Price</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='number'
          placeholder='Enter Price'
          name='price'
          id='price'
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          required
        />

        <label htmlFor='type'>Bed Type</label>
        <div>
          <div className='flex gap-4'>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='text'
              placeholder='Ex. 1 double bed'
              name='bedtype'
              id='bedtype'
              onChange={(e) => setBedtype(e.target.value)}
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
            {editRoom.map((data, index) => {
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
        <div className='flex flex-col md:flex-row gap-3'>
          <span className='flex flex-col'>
            <label htmlFor='guest'>Guests</label>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='number'
              placeholder='Number of guest'
              name='number_of_guests'
              id='guest'
              value={number_of_guests}
              onChange={(e) => setNumber_of_guests(parseInt(e.target.value))}
              required
            />
          </span>
          <span className='flex flex-col'>
            <label htmlFor='bedrooms'>Bedrooms</label>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='number'
              placeholder='Number of bedrooms'
              name='bedrooms'
              id='bedrooms'
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value))}
              required
            />
          </span>
          <span className='flex flex-col'>
            <label htmlFor='beds'>Beds</label>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='number'
              placeholder='Number of beds'
              name='beds'
              id='beds'
              value={beds}
              onChange={(e) => setBeds(parseInt(e.target.value))}
              required
            />
          </span>
          <span className='flex flex-col'>
            <label htmlFor='bathrooms'>Bathrooms</label>
            <input
              className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
              type='number'
              placeholder='Number of bathrooms'
              name='bathrooms'
              id='bathrooms'
              value={bathrooms}
              onChange={(e) => setBathrooms(parseInt(e.target.value))}
              required
            />
          </span>
        </div>
        <div>
          <p className='mb-4'>Amenities</p>
          <div className='flex flex-row gap-4'>
            {/* <div className='grid grid-cols-5 gap-2'> */}
            {editAmenities.map((data, index) => {
              return (
                <div
                  key={index}
                  className='flex gap-1 items-center p-2 bg-[#6C749D] rounded-full text-white w-fit'>
                  <IoMdClose
                    className='text-xl text-white cursor-pointer'
                    onClick={() => removeAmenities(data)}
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
        {/* images */}
        <label htmlFor=''>Images</label>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
          {image_url.map((data: any, index: any) => {
            return (
              <div key={index} className='relative'>
                <IoMdClose
                  className='text-2xl text-white cursor-pointer z-50 absolute'
                  onClick={() => dispatch(removeImages(data.url))}
                />
                <Image
                  className='rounded-md'
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
          className='cursor-pointer p-3 bg-[#dae2ed] text-[#60CBB8] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
          type='submit'
          value='Update Room'
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default EditRoom;
