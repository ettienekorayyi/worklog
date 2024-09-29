import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { addActivity } from '../actions/activityAction';

export default function FormDialog({ open, handleClose, handleReload, jobId }) {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = () => {
    let currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
    
    const createdOn = formattedDate;
    const lastUpdated = formattedDate;
    const  lastUpdatedBy = 'Steve';
    const activity = { description, jobId, createdOn, lastUpdated, lastUpdatedBy };
    dispatch(addActivity(activity));
    handleReload(true);
    handleClose();
  };
  
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Create New Worklog</DialogTitle>
        <DialogContent>
          <TextField
            focusColor='red'
            autoFocus
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
            type="text"
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
