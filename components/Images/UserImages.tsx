import Image from 'next/image';
import React from 'react';

const UserImages = ({ images }: { images: string }) => {
  return (
    <div>
      <Image
        className='rounded-full object-cover'
        src={images}
        alt='Dahilayan'
        width={50}
        height={50}
      />
    </div>
  );
};

export default UserImages;
