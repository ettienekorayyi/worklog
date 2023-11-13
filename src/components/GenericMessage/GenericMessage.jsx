import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import worklog_logo from "../../common/assets/images/worklog_logo1.png";
import "../../index.css";

export default function GenericMessage() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '80vw',
                backgroundColor: '#fff',
                '& > :not(style)': {
                    mt: "10rem",
                    ml: '3rem',
                    mr: '3rem',
                    width: '100vw',
                },
            }}
        >
            <Paper
                elevation={0}
                sx={{ backgroundColor: '#fff' }}
            >
                <img id='logo-msg' src={worklog_logo} />
            </Paper>
            <Paper elevation={0}
                id='generic-message'
                sx={{
                    backgroundColor: '#fff',
                    fontSize: '45px',
                    fontFamily: 'Comfortaa',
                    color: '#fff',
                    width: '12rem'
                }}>
                <div id='wrapper'>
                    <p style={{color: "black"}}>You can only view the worklog app in mobile devices.</p>
                </div>
            </Paper>
        </Box>
    );
}