import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateActivity } from '../../../actions/activityAction';
import { useDispatch, useSelector } from 'react-redux';

export default function JobDiaryDetails({ 
  open, handleClose,activityId,
  description,lastUpdatedDate, 
  lastUpdatedBy, jobId
}) { 
  const [desc, setDesc] = useState(description);
  const dispatch = useDispatch();

  const activity = {
    worklogId: activityId, 
    description: desc,
    jobId: jobId
  };
 
  const handleOnChange = ({ target }) => setDesc(target.value);
  const handleUpdate = () => {
    dispatch(updateActivity(activity));
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Job Diary Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            value={desc}
            fullWidth
            variant="outlined"
            onChange={handleOnChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Updated Date"
            value={lastUpdatedDate}
            fullWidth
            disabled
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Updated By"
            value={lastUpdatedBy}
            fullWidth
            disabled
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'black' }} onClick={handleClose}>Cancel</Button>
          <Button style={{ color: 'black' }} onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
