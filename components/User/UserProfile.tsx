import Image from 'next/image';
import React from 'react';

const UserProfile = () => {
  return (
    <div>
      <Image
        className='rounded-full object-cover'
        src='https://res.cloudinary.com/dyvisacbu/image/upload/v1664698266/Hotel%20User%20Image/1664698260709-account_ttr2cd.png'
        // src={userImage!}
        alt='Dahilayan'
        width={40}
        height={40}
      />
    </div>
  );
};

export default UserProfile;
