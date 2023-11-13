import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useDispatch } from 'react-redux';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { search } from '../actions/searchAction';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled(Button)(({ theme }) => ({ 
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    //padding: theme.spacing(1, 1, 1, 0),
    //left: '0px',
    // vertical padding + font size from searchIcon
    padding: `0.50rem 4rem 0.5rem 10rem`,
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,//
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: 'black',
  height: '100%',//
  '&:hover': {
    backgroundColor: 'black',
  },
  '&.MuiButtonBase-root': {
    position: 'absolute', 
    left: '0',
    backgroundColor: 'black'
  },
}));



export default function SearchAppBar({setSearchInitiated}) { //  { setSearchTerm }
  const [field, setField] = useState('');
  const dispatch = useDispatch();

  const FieldOnChange = (event) => {
    setField(event.target.value)
  }

  const ButtonOnClick = () => {
    if(field !== "") {
      setSearchInitiated(true);
      dispatch(search('job',field));
    }
    else setSearchInitiated(false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: 'black' }}>
          <Search>
            <CustomButton onClick={ButtonOnClick} variant="contained">
              <SearchIconWrapper>
                <SearchIcon style={{ color: 'white' }} />
              </SearchIconWrapper>
            </CustomButton>

            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{ left: '40px' }}
              onChange={FieldOnChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
