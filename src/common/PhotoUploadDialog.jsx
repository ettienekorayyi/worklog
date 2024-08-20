import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector /* */ } from 'react-redux';
import { addPhoto } from '../actions/photosActions';
import SimpleBackdrop from '../components/Loading/SimpleBackdrop';
import AlertModal from './AlertModal';

export default function PhotoUploadForm({
  actId,
  openPhotoUpload,
  setOpenPhotoUpload,
}) {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const matches = useMediaQuery('(max-width:400px)');
  const { photos } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (image !== '') {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('worklogId', actId);
      
      dispatch(addPhoto(formData));
      handleClear();
    } else console.log('File is empty')
  };

  const handleClosePhotoUpload = () => setOpenPhotoUpload(false);

  const handleClear = () => {
    setImage('');
    setPreview('');
  };

  const handleOnChange = evt => {
    if (evt.target.files.length !== 0) {
      const file = evt.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <>
      <Dialog open={openPhotoUpload} onClose={handleClosePhotoUpload} >
        <DialogTitle style={{ textAlign: 'center' }}>Upload New Photo</DialogTitle>
        <DialogContent dividers>

          <div id="img-upload">
            <div
              id='preview'
              style={{
                width: matches === true
                  ? '70vw' : '60vw',
                height: matches === true
                  ? '35vh' : '50vh'
              }}>
              {
                preview !== ''
                  ? <img src={`${preview}`} width='100%' height='90%' />
                  : <UploadFileIcon id='icon' alt='Click to Upload Image' />
              }
            </div>
            <div id='content'>
              <input
                type="file"
                id="file"
                name="file"
                alt="Click to upload image"
                src="/assets/images"
                onChange={handleOnChange}
              />
            </div>
          </div>

        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClosePhotoUpload}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        <SimpleBackdrop loading={photos.loading} />
      </Dialog>
      {
          photos.showModal == true 
            ? <AlertModal showModal={photos.showModal} item="photo" text="uploaded" /> 
            : null
      }
    </>
  );
}
