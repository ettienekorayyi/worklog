import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import DashboardCard from './DashboardCard'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../../actions/action'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: '30px',
  border: '2px solid black',
  boxShadow: '1px 1px 7px 1px #414a4c',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027'
  })
}))

export default function DashboardGrid () {
  const { jobs } = useSelector(state => state)
  const dispatch = useDispatch()
  // Get Total Job Counts per status
  // Get Overall Total Job Counts

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '2rem',
          marginLeft: '-1.5rem',
          marginBottom: '5rem',
          width: '25rem'
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={3} spacing={2}>
        <Grid item xs={8}>
            <Item sx={{ foregroundColor: 'black' }}>
              <DashboardCard title='Completed Jobs' />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <DashboardCard title='Pending Jobs' />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
            <DashboardCard title='Not Started Jobs' />
            </Item>
          </Grid>
          {/*
          <Grid item xs={8}>
            <Item sx={{ foregroundColor: 'black' }}>
              <DashboardCard title='Completed Jobs' />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <DashboardCard title='Pending Jobs' />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
            <DashboardCard title='Not Started Jobs' />
            </Item>
          </Grid>
          */}
        </Grid>
      </Box>
    </Container>
  )
}
