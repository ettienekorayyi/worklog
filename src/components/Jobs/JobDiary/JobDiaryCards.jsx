import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../../actions/activityAction';
import PhotoUploadDialog from '../../../common/PhotoUploadDialog';
import DetailsDialog from '../../../common/DetailsDialog';
import Container from '@mui/material/Container';
import unknownPhoto from '../../../common/assets/images/blank-profile-picture.png';


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: theme.spacing(10),
    boxShadow: '5px 10px 18px #888888'
  },
  title: {
    padding: theme.spacing(3),
    color: "#1a1a1a",
    fontFamily: "Poppins",
    textAlign: 'right'
  },
  activityButtonWide: {
    position: 'relative',
    top: '4.50rem',
    height: '60px !important',
    width: '60px !important',
    borderRadius: '50px !important',
    backgroundColor: 'orange !important',
    boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);'
  },
  activityButtonMobile: {
    position: 'relative',
    top: '-2rem',
    left: '0rem !important',
    height: '60px !important',
    width: '30vw !important',
    backgroundColor: 'orange !important',
    boxShadow: '0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);'
  },
  iconColor: {
    color: 'black'
  },
  uploadButton: {
    left: '.20rem !important',
    marginRight: '1.10rem !important'
  },
  id: {
    padding: '5px 15px',
    minWidth: '10px',
    height: '30px',
    marginLeft: '1rem',
    fontSize: '17px',
    color: '#ffffff',
    left: '4.50rem !important'
  }
}));

export default function JobDiaryCards({ handleClickOpen, diary, handleReload, reload }) {

  const dispatch = useDispatch();
  const [openPhotoUploadDialog, setOpenPhotoUploadDialog] = React.useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);

  const [param, setParam] = React.useState({}); 
  const [type, setType] = React.useState('');
  const [actId, setActId] = React.useState(null);
  const { activity } = useSelector(state => state);
  
  const id = diary === undefined ? 0 : diary.rows.id;
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:400px)');

  const handleOpenUploadForm = (id) => {
    setOpenPhotoUploadDialog(true);
    setActId(id);
    setType('photoUpload');
  };

  const handleCloseUploadForm = () => {
    setOpenPhotoUploadDialog(false);
  };

  const handleDetailsForm = (activityParam) => {
    setOpenDetailsDialog(true);
    setParam(activityParam)
    setType('jobDetails');
  };

  const handleCloseDetailsForm = () => {
    setOpenDetailsDialog(false);
  };


  useEffect(() => {
    dispatch(getActivities(true, id));
    
    if (reload) handleReload(false);

  }, [reload]);

  
  const setPhoto = (id, image) => {
    let len = image.length - 1;

    if (image[len] !== undefined) {
      return `https://www.taskstech-core.com/api/v1/photos/${id}/${image[len].filename}`;
    }
    else return unknownPhoto;
  };


  const activityDetails = activity.payload.map((act) => {
    let dateObj = new Date(act.create_date);

    return (
      <Grid key={act.id} item xs={matches === true ? 12 : 4} >
        <Card sx={{
          maxWidth: 345,
        }}>
          <CardActionArea onClick={() => handleDetailsForm(act)} >
            <CardMedia
              component="img"
              height="140"
              image={setPhoto(act.id, act.upload_photos)}
            />
            <CardContent style={{ backgroundColor: '#4e4af2' }}>
              <Typography gutterBottom variant="h5" component="div" color="#ffffff">
                {act.description}
              </Typography>
              <Container>
                <Typography variant="body2" color="#ffffff">
                  Created on {dateObj.toDateString()}
                </Typography>

              </Container>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ backgroundColor: '#4e4af2' }} >
            <Button variant="outlined" className={classes.uploadButton}>
              <UploadIcon className={classes.iconColor} onClick={() => handleOpenUploadForm(act.id)} />
            </Button>
            <Typography variant="outlined" className={classes.id}>
              <span style={{ paddingTop: '22px' }}>Activity Id: {act.id}</span>
            </Typography>

          </CardActions>
        </Card>
      </Grid>
    );
  });

  const renderDialog = () => {
    if (type === 'photoUpload') {
      return (
        <PhotoUploadDialog
          open={openPhotoUploadDialog}
          actId={actId}
          handleClose={handleCloseUploadForm} //handleCloseUploadForm
          handleReload={handleReload}
        />
      );
    } else if (type === 'jobDetails') {
      return (
        <DetailsDialog
          activity={param}
          open={openDetailsDialog}
          handleClose={handleCloseDetailsForm}
        />
      );
    } else null;
  }

  return (
    <Box
      sx={{
        width: matches === true
          ? '80vw' : '55vw'
      }}
      className={classes.root}
    >
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={matches === true ? 10 : 8} >
          <p
            className={classes.title}
            style={{
              fontSize: matches === true
                ? '38px' : '48px'
            }}
          >
            Job Diary
          </p>
        </Grid>
        <Grid item xs={matches === true ? 12 : 4} >
          <Button
            className={
              matches === true
                ? classes.activityButtonMobile
                : classes.activityButtonWide
            }
            variant="outlined"
          >
            <NoteAddIcon
              style={{
                color: 'black',
                fontSize: matches === true
                  ? '58px' : '48px'
              }}
              onClick={handleClickOpen}
            />
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        className='jobDiaryGrid'
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {activityDetails}
        {renderDialog()}
      </Grid>
    </Box>
  );
}
