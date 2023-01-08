import Image from 'next/image';
import React from 'react';

interface ImageTypes {
  images: JsonWebKey;
  //   url: string;
}

const RidesImage = ({ images }: any) => {
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

      {/* {images.map((data: ImageTypes, index: number) => {
        const { url } = data;
        console.log(url);
        return (
          <div key={index}>
            <Image
              className='rounded-md'
              src={url}
              alt='Dahilayan'
              width={118}
              height={80}
              //   loader={RoomLoader}
            />
          </div>
        );
      })} */}
    </div>
  );
};

export default RidesImage;
