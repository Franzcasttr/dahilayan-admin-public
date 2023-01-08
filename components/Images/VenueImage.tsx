import Image from 'next/image';
import React, { FC, useState } from 'react';

interface IProps {
  images: string[];
}

interface IImageProps {
  url: string;
}
const VenueImage = ({ images }: any) => {
  const firstImage = images[0];

  return (
    <div>
      <Image
        className='rounded-md'
        src={firstImage.url}
        alt='Dahilayan'
        width={118}
        height={80}
        layout='fixed'
      />
      {/* {images.map((data, index) => {
        const firstImage = data[0];

        return (
          <Image
            key={index}
            className='rounded-md'
            src={firstImage}
            alt='Dahilayan'
            width={118}
            height={80}
          />
        );
      })} */}
    </div>
  );
};

export default VenueImage;
