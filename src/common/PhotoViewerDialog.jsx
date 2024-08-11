import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux'
import { getPhoto } from '../actions/photosActions'
import SimpleBackdrop from '../components/Loading/SimpleBackdrop'
import PhotoUploadDialog from './PhotoUploadDialog'
import Grid from '@mui/material/Grid'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={2}>
          {onClose ? (
            <IconButton
              id='closeIconButton'
              aria-label='close'
              onClick={onClose}
              sx={{
                position: 'absolute !important',
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
}

export default function PhotoViewerDialog ({
  openPhotoViewer,
  setOpenPhotoViewer,
  actId,
  description // uploadedPhotos
}) {
  const dispatch = useDispatch()
  const { photos } = useSelector(state => state)
  const [submitBtnIsClicked, setSubmitBtnIsClicked] = useState(false)
  const [openPhotoUpload, setOpenPhotoUpload] = useState(false)

  useEffect(() => {
    if (actId !== 0) {
      // uploadedPhotos !== undefined &&
      dispatch(getPhoto(actId))
    }
  }, [actId]) 

  //const handleReload = (arg) => setReload(arg);
  const handleClosePhotoViewer = () => setOpenPhotoViewer(false)

  const handleSubmit = () => {
    setOpenPhotoUpload(true)
    setSubmitBtnIsClicked(true)
  }

  //const imageSrc = `data:image/png;base64,${photos.fileData}`

  const photoViewer = () => {
    return (
      <BootstrapDialog
        onClose={handleClosePhotoViewer}
        aria-labelledby='customized-dialog-title'
        open={openPhotoViewer}
      >
        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClosePhotoViewer}
        >
          {description}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {
            //src={`data:image/jpeg;base64,${data}`}

            photos.loading !== true ? (
              <img src={photos.fileData} style={{ width: '100%' }} />
            ) : (
              <>
                <SimpleBackdrop loading={photos.loading} />
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
    )
  }

  return (
    <div>
      {photoViewer()}
      {submitBtnIsClicked === true ? (
        <PhotoUploadDialog
          actId={actId}
          openPhotoUpload={openPhotoUpload}
          setOpenPhotoUpload={setOpenPhotoUpload}
        />
      ) : null}
    </div>
  )
}
