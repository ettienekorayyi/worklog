import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import * as History from 'history';
export const history = History.createBrowserHistory();

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 2,
  pb: 2,
};


export default function AlertModal({ showModal,item, text }) {
  const [open, setOpen] = useState(showModal);

  const handleClose = () => {
    setOpen(false);
    history.push("/view/jobs"),
    window.location.reload();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '250' }}>
          <h2 id="parent-modal-title" style={{ textAlign: 'center',textTransform: 'uppercase' }}>Success</h2>
          <p id="parent-modal-description" style={{ textAlign: 'center', textTransform: 'capitalize' }}>
            The {item} has been {text} succesfully.
          </p>
          <Button 
              style={{ color: '#000', position: 'relative',left: '3.5rem' }} 
              onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
