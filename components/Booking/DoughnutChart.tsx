import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useSWR from 'swr';
import { doughnutChart } from '../../types/bookingListTypes';
import { API } from '../../config/API';
ChartJS.register(ArcElement, Tooltip, Legend);

const fetcher = (url: string) => API.get(url).then((res) => res.data);

const DoughnutChart = () => {
  const { data, error } = useSWR('bookings/doughnutchart', fetcher);
  let Pending;
  let Booked;
  let Cancelled;
  data !== undefined &&
    data.map((data: doughnutChart) => {
      Pending = data.Pending;
      Booked = data.Booked;
      Cancelled = data.Cancelled;
      return data;
    });

  const statusData = {
    labels: ['Pending', 'Booked', 'Cancelled'],
    datasets: [
      {
        data: [Pending, Booked, Cancelled],
        backgroundColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <p className='text-center font-semibold text-2xl mb-2'>Status</p>
      <Doughnut data={statusData} />
    </div>
  );
};

export default DoughnutChart;
