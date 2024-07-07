import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export function NotFound ({status, errorMessage}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid>
        <h1 className='worklog-error'>{status}</h1>
        <p className='errmessage'>{errorMessage}</p>
      </Grid>
    </React.Fragment>
  )
}
