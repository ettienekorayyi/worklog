import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoto } from '../actions/photosActions';
import SimpleBackdrop from '../components/Loading/SimpleBackdrop';
import PhotoUploadDialog from './PhotoUploadDialog';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function PhotoViewerDialog({ 
  openPhotoViewer, setOpenPhotoViewer,
  actId, uploadedPhotos, description 
}) { 
  const dispatch = useDispatch();
  const { photos } = useSelector(state => state);
  const filename = uploadedPhotos !== [] ? uploadedPhotos[uploadedPhotos.length-1]?.filename : '';
  const [submitBtnIsClicked, setSubmitBtnIsClicked] = useState(false);
  const [openPhotoUpload, setOpenPhotoUpload] = useState(false);
  

  useEffect(() => {
    if (uploadedPhotos !== undefined && actId !== 0) {
      dispatch(getPhoto(actId, filename));
    }
  }, [filename]);

  //const handleReload = (arg) => setReload(arg);
  const handleClosePhotoViewer = () => setOpenPhotoViewer(false);

  const handleSubmit = () => {
    setOpenPhotoUpload(true); 
    setSubmitBtnIsClicked(true);
  }


  const photoViewer = () => {
    return (
      <BootstrapDialog
        onClose={handleClosePhotoViewer}
        aria-labelledby="customized-dialog-title"
        open={openPhotoViewer}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClosePhotoViewer}>
          {description}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {
            photos.loading !== true
              ? <img
                  src={`${photos.filename}`}
                  style={{ width: '100%' }}
                />
              : (
                <>
                  <SimpleBackdrop loading={photos.loading} />
                  <img
                    src={`${photos.filename}`}
                    style={{ width: '100%' }}
                  />
                </>
              )
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Upload Photo
          </Button>
        </DialogActions>
      </BootstrapDialog>
    );
  }
  
  return (
    <div>
      {photoViewer()}
      {
        submitBtnIsClicked === true 
          ? <PhotoUploadDialog 
              actId={actId} openPhotoUpload={openPhotoUpload} 
              setOpenPhotoUpload={setOpenPhotoUpload}
            /> 
          : null
      }
    </div>
  );
}
