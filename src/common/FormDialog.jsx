import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { addActivity } from '../actions/activityAction';
//import { makeStyles } from "@material-ui/core/styles";
/*
const focusedColor = "#000";

const useStyles = makeStyles({
  root: {
    // input label when focused
    "& label.Mui-focused": {
      color: focusedColor
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: focusedColor
    },
  }
});*/

export default function FormDialog({ open, handleClose, handleReload, jobId }) {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  //const classes = useStyles();
  
  const handleSubmit = () => {
    const activity = { description, jobId };
    dispatch(addActivity(activity));
    handleReload(true);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Create New Diary</DialogTitle>
        <DialogContent>
          <TextField
            focusColor='red'
            autoFocus
            //className={classes.root}
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Job Id"
            type="number"
            fullWidth
            variant="standard"
            value={jobId} 
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#000" }}>Cancel</Button>
          <Button onClick={handleSubmit} style={{ color: "#000" }}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
