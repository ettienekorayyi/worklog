import React from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/system";
import worklog_logo from "../common/assets/images/worklog_logo1.png";
import "../common/assets/css/apple.css";

const StyledGrid = styled(Grid)(({ theme }) => ({
    height: "100vh",
    ".paper": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    ".form": {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    ".submit": {
        color: "#fff",
        backgroundColor: "#000000",
        margin: theme.spacing(3, 1, 3, 1),
        "&:hover": {
            backgroundColor: "#36454F",
            boxShadow: "none",
        },
    },
}));

export default function LoginIndex ({ history }) {
    /*
    const matchesIphone678Viewport = useMediaQuery(
        "(max-width: 376px) and (max-height: 668px)"
    );
    const matchesIphone4Viewport = useMediaQuery(
        "(max-width: 320px) and (max-height: 480px)"
    );

    const iphone4 = {
        properties: {
            name: "iphone4",
            viewport: "aquamarine !important",
            height: "15vh !important",
        },
    };
    */

    const matches = useMediaQuery("(max-width:600px)");

    return (
        <StyledGrid container component='main' className={`root`}>
            <CssBaseline />
            <Grid
                item
                xs={12}
                sm={7}
                md={7}
                component={Paper}
                elevation={6}
                square
            >
                <div className={`paper`}>
                    <div className={`form`}>
                        <Container component='main' maxWidth='xs' id='mainLoginContainer'>
                            <Grid
                                container
                                spacing={3}
                                className='gridContainer'
                            >
                                <Grid
                                    item
                                    xs={12}
                                    className='worklogLogoContainer'
                                >
                                    <img id='worklog_logo' src={worklog_logo} />
                                </Grid>
                                <Grid item xs={12} className='worklogTextGrid'>
                                    <p
                                        className={"title worklogText"}
                                        style={{
                                            position: "relative",
                                            fontSize: "48px !important",
                                        }}
                                    >
                                        worklog
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid container className='btnMargin'>
                                <Grid item xs={12}>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        className='submit customButtons'
                                        id='login'
                                        onClick={() =>
                                            history.push("/mobile-login")
                                        }
                                    >
                                        Log in
                                    </Button>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        className='submit customButtons'
                                        id='register'
                                        onClick={() => history.push("/signup")}
                                    >
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
            </Grid>
        </StyledGrid>
    );
}
