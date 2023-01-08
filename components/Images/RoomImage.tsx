import Image from 'next/image';
import React, { useState } from 'react';

// interface image_source {
//   src: string;
//   name: string;
//   roomImageById: string;
//   url: string[];
// }

// function RoomLoader({ src }: image_source) {
//   const relativeSrc = (src: string) => src.split('/').pop();

//   return `https:/images.unsplash.com/${relativeSrc(src)}`;
// }

const RoomImage = ({ images }: any) => {
  //   type IMG = image_source;

  return (
    <div>
      {images.map((data: any, index: any) => {
        return (
          <div key={index}>
            <Image
              className='rounded-md'
              src={data.url[0].url}
              alt={data.name}
              width={118}
              height={80}
              layout='fixed'
              //   loader={RoomLoader}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RoomImage;
