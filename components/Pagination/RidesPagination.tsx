import { useRouter } from 'next/router';
import React from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
const RidesPagination = ({
  numberOfPages,

  pagenumber,
}: {
  numberOfPages: number;
  pagenumber: number;
}) => {
  const { push } = useRouter();

  const page = Array.from({ length: numberOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <div className='flex gap-2 md:gap-8 justify-center items-center p-4 bg-[#e8f2ff] mb-8 rounded-lg font-semibold'>
      <button
        className={
          pagenumber === 1
            ? 'flex gap-1 items-center cursor-not-allowed'
            : 'flex gap-1 items-center'
        }
        onClick={() => push(`/rides?pages=${pagenumber - 1}`)}
        disabled={pagenumber === 1}>
        <GrFormPrevious className='text-xl' />
        <span>Prev</span>
      </button>
      {page.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            type='button'
            className={
              pageNumber === pagenumber
                ? 'text-green-400 font-bold text-2xl'
                : ''
            }
            onClick={() => push(`/rides?pages=${pageNumber}`)}>
            {pageNumber}
          </button>
        );
      })}
      <button
        className={
          pagenumber === numberOfPages
            ? 'flex gap-1 items-center cursor-not-allowed'
            : 'flex gap-1 items-center'
        }
        onClick={() => push(`/rides?pages=${pagenumber + 1}`)}
        disabled={pagenumber === numberOfPages}>
        <span>Next</span>
        <GrFormNext className='text-xl ' />
      </button>
    </div>
  );
};

export default RidesPagination;
