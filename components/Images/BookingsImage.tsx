import Image from 'next/image';
import React from 'react';

const BookingImage = ({ images, name }: { images: string; name: string }) => {
  return (
    <div>
      <Image
        className='rounded-full object-cover'
        src={images}
        alt={name}
        width={50}
        height={50}
        layout='fixed'
      />
    </div>
  );
};

export default BookingImage;
