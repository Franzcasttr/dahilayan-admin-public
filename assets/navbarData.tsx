import { GiKeyCard, GiMushroomHouse } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { SiNintendogamecube } from 'react-icons/si';
import { GoCalendar } from 'react-icons/go';
import { TbRollercoaster } from 'react-icons/tb';

export const NavData = [
  {
    id: 1,
    link: '/',
    name: 'Dashboard',
    icon: <SiNintendogamecube />,
  },
  {
    id: 2,
    link: '/rooms',
    name: 'Rooms',
    icon: <GiKeyCard />,
  },
  {
    id: 3,
    link: '/bookings',
    name: 'Bookings',
    icon: <GoCalendar />,
  },
  {
    id: 4,
    link: '/rides',
    name: 'Rides',
    icon: <TbRollercoaster />,
  },
  {
    id: 5,
    link: '/venues',
    name: 'Venue',
    icon: <GiMushroomHouse />,
  },
  {
    id: 6,
    link: '/users',
    name: 'Users',
    icon: <HiOutlineUserGroup />,
  },
];
