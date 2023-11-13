import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DetailsDialog({ activity, open, handleClose }) {
  const matches = useMediaQuery('(max-width:400px)');

  const renderDetails = () => {
    return (
      <Dialog open={open} onClose={handleClose} >
        <div style={{ width: matches === true ? '81vw' : '25vw' }}>
          <DialogTitle style={{ textAlign: 'center' }}>Activity: {activity.description}</DialogTitle>
          <DialogContent dividers>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={activity.job.description}
              label="Job Description"
              type="text"
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={activity.create_date}
              label="Created On"
              type="text"
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={activity.update_date}
              disabled
              label="Last Updated"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={activity.update_by}
              disabled
              label="Last Updated By"
              type="text"
              fullWidth
              variant="outlined"
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    );
  };

  //console.log(activity);
  return (
    <>
      {renderDetails()}
    </>
  );
}
