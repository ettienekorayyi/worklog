import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import DashboardCard from './DashboardCard'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs, getStatus } from '../../actions/action'
import BasicPie from './PieChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  }),
  borderRadius: '1rem',
  boxShadow: '2px 1px 3px 3px #36454F',
  width: '6rem',
  margin: '0 auto'
}))

const PieChartItem = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  }),
  borderRadius: '1rem',
  boxShadow: '2px 1px 3px 3px #36454F',
  marginTop: '2.0rem',
  marginLeft: '6.0rem',
  height: '20rem'
}))

export default function DashboardGrid () {
  const { jobs, status } = useSelector(state => state)
  const [completed, setCompleted] = useState(0);

  const dispatch = useDispatch()
  
  const filteredJobs = jobs.payload.filter(job => {
     const jobStatus = status.payload?.find(jobStatus => jobStatus.id === job.statusId);
     job.status = jobStatus?.name;
    return {...job, ...jobStatus}
  }, {})


  const findTotalJobs = (status) => filteredJobs?.filter(job => job.status === status);

  useEffect(() => {
    dispatch(getAllJobs())
    dispatch(getStatus())
  }, [])

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '2rem',
          marginLeft: '-6.0rem',
          marginBottom: '5rem'
        }}
      >
        <Grid container spacing={5} rowSpacing={2} columnSpacing={14}>
          <Grid item xs={2}>
            <Item sx={{ foregroundColor: 'black' }}>
              <DashboardCard title='Completed Jobs' total={findTotalJobs('Completed')?.length} />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <DashboardCard title='Pending Jobs' total={findTotalJobs('In Progress')?.length} />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <DashboardCard title='Jobs Not Started' total={findTotalJobs('Not Started')?.length} />
            </Item>
          </Grid>
          <Grid item xs={12} id='pie-chart-grid'>
            <PieChartItem>
              <BasicPie 
                  completed={findTotalJobs('Completed')?.length}
                  pending={findTotalJobs('In Progress')?.length}
                  active={findTotalJobs('Not Started')?.length}
              />
            </PieChartItem>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
