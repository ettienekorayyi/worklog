import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import DashboardCard from './DashboardCard'
import Container from '@mui/material/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../../actions/action'
import { PieChart } from '@material-ui/icons'

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
  const { jobs } = useSelector(state => state)
  const dispatch = useDispatch()
  // Get Total Job Counts per status
  // Get Overall Total Job Counts

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

  return (
    <PieChart />

  )
}
