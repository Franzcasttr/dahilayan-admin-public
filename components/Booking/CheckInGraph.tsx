import React from 'react';
import useSWR from 'swr';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { graphChart } from '../../types/bookingListTypes';
import { API } from '../../config/API';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Customer Check In and Out Graph',
    },
  },
};

const fetcher = (url: string) => API.get(url).then((res) => res.data);

const CheckInGraph = () => {
  const { data, error } = useSWR('bookings/checkinoutgraph', fetcher);

  const resultdata = {
    labels:
      data !== undefined &&
      data.map((data: graphChart) => {
        const { monthly } = data;
        const newDate = new Date(monthly);
        const months = newDate.toLocaleString('default', { month: 'short' });
        return months;
      }),
    datasets: [
      {
        label: 'Check In',
        data:
          data !== undefined && data.map((data: graphChart) => data.CHECKIN),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Check Out',
        data:
          data !== undefined && data.map((data: graphChart) => data.CHECKOUT),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Line data={resultdata} options={options} height={300} />
    </div>
  );
};

export default CheckInGraph;
