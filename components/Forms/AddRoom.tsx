import React, { ChangeEvent, SetStateAction, useState } from 'react';
import {
  addRoomAmenities,
  bedType,
  removeBedType,
  removeRoomAmenities,
} from '../../features/rooms/roomSlice';
import { API } from '../../config/API';
import { useAppDispatch, useAppSelector } from '../../features/app/hook';
import { FaFireExtinguisher, FaWifi } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { GiRiceCooker, GiShower, GiWashingMachine } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';
import { MdOutlinePaid } from 'react-icons/md';
import { BsSnow } from 'react-icons/bs';
import { TbBrandAirtable } from 'react-icons/tb';
import { HiOutlineFire } from 'react-icons/hi';
import { RiFirstAidKitLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/router';

const initialValue = {
  room_name: '',
  price: '',
  number_of_guests: '',
  bedrooms: '',
  beds: '',
  bathrooms: '',
};

const AddRoom = ({
  setAddRoom,
}: {
  setAddRoom: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { push, asPath } = useRouter();
  const [images, setImages] = useState<FileList | null>(null);
  const [value, setValue] = useState(initialValue);
  const [bedtype, setBedtype] = useState<string>('');
  // const [amenities, setAmenities] = useState({});
  const [desc, setDesc] = useState('');
  const [wifi, setWifi] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [tv, setTv] = useState(false);
  const [washer, setWasher] = useState(false);
  const [free, setFree] = useState(false);
  const [paid, setPaid] = useState(false);
  const [aircon, setAircon] = useState(false);
  const [workplace, setWorkplace] = useState(false);
  const [outdoor, setOutdoor] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [extinguisher, setExtinguisher] = useState(false);
  const [aid, setAid] = useState(false);
  const dispatch = useAppDispatch();
  const { bedtype: bedtypes, amenities: room_amenities } = useAppSelector(
    (state) => state.rooms
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    setImages(file);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(bedType(bedtype));
  };
  const deleteBedType = (data: string) => {
    dispatch(removeBedType(data));
  };
  const handleCheck = async (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // setAmenities((prevValue) => ({
      //   ...prevValue,
      //   [e.target.name]: e.target.value,
      // }));

      dispatch(addRoomAmenities(e.target.value));
    } else {
      dispatch(removeRoomAmenities(e.target.value));
    }
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    // React.Dispatch<React.SetStateAction<string>>
    setAddRoom(false);
    const form = new FormData();

    if (images !== null) {
      for (const file of images!) {
        form.append('image_upload', file);
      }
    }
    form.append('room_name', value.room_name);
    form.append('price', value.price);
    bedtypes.forEach((tag: string) => {
      form.append('bedtype', tag);
    });
    form.append('number_of_guests', value.number_of_guests);
    form.append('bedrooms', value.bedrooms);
    form.append('beds', value.beds);
    form.append('bathrooms', value.bathrooms);
    room_amenities.forEach((tag: string) => {
      form.append('amenities', tag);
    });
    // form.append('amenities', JSON.stringify(amenities));

    form.append('description', desc);

    try {
      const res = await API.post('rooms/create', form);

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

        <label htmlFor='rooms'>Room Name</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='text'
          placeholder='Enter Room Name'
          name='room_name'
          id='rooms'
          value={value.room_name}
          onChange={handleInput}
        />
        <label htmlFor='price'>Price</label>
        <input
          className='outline-none bg-[#dae2ed] border border-[#AAAAAA] rounded-lg pl-2 h-12'
          type='number'
          placeholder='Enter Price'
          name='price'
          id='price'
          onChange={handleInput}
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
              value={bedtype}
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
            {bedtypes.map((data, index) => {
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
              value={value.number_of_guests}
              onChange={handleInput}
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
              onChange={handleInput}
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
              onChange={handleInput}
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
              onChange={handleInput}
              required
            />
          </span>
        </div>
        <div>
          <p>Amenities</p>
          <div className='checkboxes grid grid-cols-2 md:grid-cols-4 gap-8 '>
            <label
              htmlFor='awifi'
              className={`${
                wifi
                  ? 'cursor-pointer bg-slate-400 rounded-md text-white'
                  : 'cursor-pointer'
              }`}
              onClick={() => setWifi(!wifi)}>
              <div className=' flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <FaWifi className='text-4xl mb-3' />
                <p className='text-sm'>Wifi</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Wifi'
              name='wifi'
              id='awifi'
              onChange={handleCheck}
            />
            <label
              htmlFor='atv'
              className={`${
                tv
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setTv(!tv)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <FiMonitor className='text-4xl mb-3' />
                <p className='text-sm'>TV</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='TV'
              name='tv'
              id='atv'
              onChange={handleCheck}
            />
            <label
              htmlFor='akitchen'
              className={`${
                kitchen
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setKitchen(!kitchen)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <GiRiceCooker className='text-4xl mb-3' />
                <p className='text-sm'>Kitchen</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Kitchen'
              name='kitchen'
              id='akitchen'
              onChange={handleCheck}
            />
            <label
              htmlFor='awasher'
              className={`${
                washer
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setWasher(!washer)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <GiWashingMachine className='text-4xl mb-3' />
                <p className='text-sm'>Washer</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Washer'
              name='washer'
              id='awasher'
              onChange={handleCheck}
            />
            <label
              htmlFor='afreeparking'
              className={`${
                free
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setFree(!free)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <AiOutlineCar className='text-4xl mb-3' />
                <p className='text-sm'>Free Parking</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Free Parking'
              name='free_parking'
              id='afreeparking'
              onChange={handleCheck}
            />
            <label
              htmlFor='apaidparking'
              className={`${
                paid
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setPaid(!paid)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <MdOutlinePaid className='text-4xl mb-3' />
                <p className='text-sm'>Paid Parking</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Paid Parking'
              name='paid_parking'
              id='apaidparking'
              onChange={handleCheck}
            />
            <label
              htmlFor='acondition'
              className={`${
                aircon
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setAircon(!aircon)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <BsSnow className='text-4xl mb-3' />
                <p className='text-sm'>Air Condition</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Air Condition'
              name='air_condition'
              id='acondition'
              onChange={handleCheck}
            />
            <label
              htmlFor='aworkplace'
              className={`${
                workplace
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setWorkplace(!workplace)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <TbBrandAirtable className='text-4xl mb-3' />
                <p className='text-sm'>Dedicated Workplace</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Dedicated Workplace'
              name='dedicated_workplace'
              id='aworkplace'
              onChange={handleCheck}
            />
            <label
              htmlFor='ashower'
              className={`${
                outdoor
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setOutdoor(!outdoor)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <GiShower className='text-4xl mb-3' />
                <p className='text-sm'>Outdoor Shower</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Outdoor Shower'
              name='outdoor_shower'
              id='ashower'
              onChange={handleCheck}
            />
            <label
              htmlFor='asmokealarm'
              className={`${
                alarm
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setAlarm(!alarm)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <HiOutlineFire className='text-4xl mb-3' />
                <p className='text-sm'>Smoke Alarm</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Smoke Alarm'
              name='smoke_alarm'
              id='asmokealarm'
              onChange={handleCheck}
            />
            <label
              htmlFor='afireextinguisher'
              className={`${
                extinguisher
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setExtinguisher(!extinguisher)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <FaFireExtinguisher className='text-4xl mb-3' />
                <p className='text-sm'>Fire Extinguisher</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='Fire Extinguisher'
              name='fire_extinguisher'
              id='afireextinguisher'
              onChange={handleCheck}
            />
            <label
              htmlFor='afirstAid'
              className={`${
                aid
                  ? 'cursor-pointer bg-slate-400 rounded-md text-gray-200'
                  : 'cursor-pointer'
              }`}
              onClick={() => setAid(!aid)}>
              <div className='flex flex-col items-center p-6 border border-[#aaa] rounded-md text-center'>
                <RiFirstAidKitLine className='text-4xl mb-3' />
                <p className='text-sm'>First Aid Kit</p>
              </div>
            </label>
            <input
              type='checkbox'
              value='First Aid'
              name='first_aid'
              id='afirstAid'
              onChange={handleCheck}
            />
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
          className='cursor-pointer p-3 bg-[#dae2ed] font-semibold text-lg rounded-md md:w-fit  md:text-center md:mx-auto drop-shadow-7xl'
          type='submit'
          value='Save room'
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddRoom;

// const { image_url } = useAppSelector((state) => state.rooms);

// for (let i = 0; i < images.length; i++) {
//   form.append('image_upload', images[i]);
// }
// console.log(form.get('image_upload'));

// if (
//   air_condition ||
//   tv ||
//   kitchen ||
//   washer ||
//   free_parking ||
//   paid_parking ||
//   dedicated_workplace ||
//   outdoor_shower ||
//   smoke_alarm ||
//   fire_extinguisher ||
//   first_aid
// ) {
//   form.append('wifi', wifi);
// }
