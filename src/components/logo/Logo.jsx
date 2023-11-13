import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@mui/material/Container";

const useStyles = makeStyles(() => ({
    image: {
        display: "flex",
        alignItems: "center",
        height: '100vh', 
        justifyContent: "center",
        backgroundColor: "#000000", 
        paddingRight: "4%",
        
    },
}));

function Logo () {
    const classes = useStyles();
    return (
        <Grid item xs={false} sm={5} md={5} className={`${classes.image} stvgrid`}>
            <Container>
                <Grid item xs={12}>
                    <p
                        className='title'
                        id='app-logo'
                        style={{
                            color: "white",
                            fontSize: "48px !important",
                        }}
                    >
                        worklog
                    </p>
                </Grid>
                
            </Container>
        </Grid>
    );
}

export default Logo;
