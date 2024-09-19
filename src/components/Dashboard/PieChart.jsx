import React from 'react';
import { PieChart } from '@mui/x-charts';

export default function BasicPie({completed,pending,active}) {
  return (
    <PieChart
      margin={{ top: 20, bottom: 70, left: 30, right:10 }}
      series={[
        {
          data: [
            { id: 0, value: completed / 3 * 100, label: 'Completed', color: '#000401' },
            { id: 1, value: pending / 3 * 100, label: 'Pending', color: '#4E545C' },
            { id: 2, value: active / 3 * 100, label: 'Not Started', color: '#8D9797' },
          ],
          color: 'red'
        },
      ]}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' },
          margin: 1,
          padding: 1,
        },
      }}
      width={300}
      height={300}
      />
  );
}
