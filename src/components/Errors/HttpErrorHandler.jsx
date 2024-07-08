import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'

export function HttpErrorHandler ({status, errorMessage}) {
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
