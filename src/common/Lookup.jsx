import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
  data,
  customerName,
  handleDropdownChange,
}) {
  const [customers, setCustomers] = useState([]); 
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setCustomers(data);  // should be generic
  });

  return (
    <div className='Lookup'>
      <FormControl 
        sx={{ 
          m: 1, mt: 1, 
          width: matches ? '70vw' : '22vw' 
        }}> {/* 70vw mobile 22vw' */}
        <Select
          displayEmpty
          value={customerName}
          name='customer_id' // should be generic
          onChange={handleDropdownChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Search Customer Name</em>; // Should be generic
            }
            
            return selected;
          }}

          MenuProps={MenuProps}

        >
          {customers.map((value, key) => ( // should be generic TBD
            <MenuItem
              key={key}
              value={`${value.first_name} ${value.last_name}`}
              style={getStyles(value.first_name, customerName, theme)}
              user_id={value.user_id}
            >
              {`${value.first_name} ${value.last_name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
