import * as React from 'react';
import { PieChart } from '@mui/x-charts';

export default function BasicPie() {
  return (
    <PieChart
      sx={{ width: '15em', height: '15em' }}
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      
    />
  );
}
