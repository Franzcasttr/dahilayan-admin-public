import React, { FC } from 'react';
import useSWR from 'swr';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { SalesType } from '../../types/SalesType';
import { API } from '../../config/API';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Monthly Sales',
    },
  },
};

const fetcher = (url: string) => API.get(url).then((res) => res.data);
const MonthlyRev: FC = () => {
  const { data, error } = useSWR('bookings/monthlySale', fetcher);

  const Saledata = {
    labels:
      data !== undefined &&
      data.map((data: SalesType) => {
        const { monthly } = data;
        const newDate = new Date(monthly);
        const months = newDate.toLocaleString('default', { month: 'long' });
        return months;
      }),
    datasets: [
      {
        label: 'Sales',
        data: data !== undefined && data.map((data: SalesType) => data.sale),
        borderColor: 'rgba(39, 142, 211, 0.5)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div>
      <div>
        <Bar data={Saledata} options={options} />
      </div>
    </div>
  );
};

export default MonthlyRev;
