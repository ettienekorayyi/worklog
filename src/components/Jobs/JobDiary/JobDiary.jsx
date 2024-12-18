import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import JobDiaryAccordions from './JobDiaryAccordions';
import JobDiaryDetails from './JobDiaryDetails';
import FormDialog from '../../../common/FormDialog';
import { getActivities } from '../../../actions/activityAction';
import { useDispatch, useSelector } from 'react-redux';

export default function JobDiary(props) { 
  const { rows, history } = props;
  const { activity } = useSelector(state => state);
  const [openActivityForm, setOpenActivityForm] = React.useState(false);
  const [openActivityDetailsForm, setOpenActivityDetailsForm] = React.useState(false);
  const [createdDate, setCreatedDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [activityId, setActivityId] = React.useState('');
  const [lastUpdatedDate, setLastUpdatedDate] = React.useState('');
  const [lastUpdatedBy, setLastUpdatedBy] = React.useState('');
  //const [jobId, setJobId] = React.useState('');
  const [reload, setReload] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(rows !== undefined) { // history !== undefined
      dispatch(getActivities(true,rows.jobId));
    }
  },[])
  
  const handleReload = (arg) => setReload(arg);
  
  const handleClickOpenActivityDetailsForm = (
    id,activityDescription,creationDate, 
    dateLastUpdated, updatedBy
  ) => {
    setOpenActivityDetailsForm(true);
    setActivityId(id);
    setDescription(activityDescription);
    setCreatedDate(creationDate);
    setLastUpdatedDate(dateLastUpdated);
    setLastUpdatedBy(updatedBy);
  }

  const handleClickCloseActivityDetailsForm = () => setOpenActivityDetailsForm(false);
  const handleClickOpenCreateForm = () => setOpenActivityForm(true);
  const handleCloseForm = () => setOpenActivityForm(false);
  
  return (
    <Container>
        {
          <JobDiaryAccordions
            diary={rows}
            reload={reload}
            handleReload={handleReload}
            handleClickOpenCreateForm={handleClickOpenCreateForm}
            handleClickOpenActivityDetailsForm={handleClickOpenActivityDetailsForm}
          />
        }
        {
          openActivityForm === true
            ? <FormDialog
              open={openActivityForm}
              jobId={history?.location.state.rows.jobId}
              handleClose={handleCloseForm}
              handleReload={handleReload}
            />
            : null
        }
        {
            openActivityDetailsForm === true
            ? <JobDiaryDetails
                jobId={activity?.payload[0]?.jobId} 
                activityId={activityId}
                description={description}
                createdDate={createdDate}
                lastUpdatedDate={lastUpdatedDate}
                lastUpdatedBy={lastUpdatedBy}
                open={openActivityDetailsForm}
                handleClose={handleClickCloseActivityDetailsForm}
            />
            : null
        }
      </Container>
  );
}
