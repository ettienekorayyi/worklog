import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { customerRegistration } from "../../actions/customerActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100vh",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        marginTop: "2rem",
        marginLeft: "2rem",
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        paddingTop: "5vh",
    },

    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 2, 3, 6),
    },
}));

export default function CustomerRegistrationForm () {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState(""),
        [lastname, setLastname] = useState(""),
        [email, setEmail] = useState(""),
        [phone, setPhone] = useState(""),
        [address, setAddress] = useState("");

    const inputFirstname = useCallback(
        event => {
            setFirstname(event.target.value);
        },
        [setFirstname]
    );

    const inputLastname = useCallback(
        event => {
            setLastname(event.target.value);
        },
        [setLastname]
    );

    const inputPhone = useCallback(
        event => {
            setPhone(event.target.value);
        },
        [setPhone]
    );

    const inputEmail = useCallback(
        event => {
            setEmail(event.target.value);
        },
        [setEmail]
    );

    const inputAddress = useCallback(
        event => {
            setAddress(event.target.value);
        },
        [setAddress]
    );

    const handleSubmit = () => {
        if (firstname === "" || lastname === "" || email === "") {
            alert("Please fill in the form.");
            return false;
        }
        dispatch(
            customerRegistration(firstname, lastname, email, address, phone)
        );
    };

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={2} md={2}>
                {/*
            Left Side Bar
        */}
            </Grid>
            <Grid
                item
                xs={12}
                sm={8}
                md={8}
                component={Paper}
                elevation={6}
                square
            >
                <div
                    id='description'
                    style={{ marginTop: "20px", color: "rgba(0, 0, 0, 0.6)" }}
                >
                    <Typography
                        component='div'
                        style={{ padding: "5px", lineHeight: "1.235" }}
                        variant='h4'
                    >
                        Customer Registration
                    </Typography>
                    <Typography
                        sx={{ margin: "0" }}
                        variant='subtitle2'
                        gutterBottom
                    >
                        Please fill the customer details
                    </Typography>
                    
                </div>
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='name'
                                    name='firstName'
                                    variant='outlined'
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    autoFocus
                                    value={firstname}
                                    onChange={inputFirstname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant='outlined'
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='name'
                                    value={lastname}
                                    onChange={inputLastname}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='phone'
                                    name='phone'
                                    variant='outlined'
                                    fullWidth
                                    id='phone'
                                    label='Phone No'
                                    autoFocus
                                    value={phone}
                                    onChange={inputPhone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='address'
                                    name='address'
                                    variant='outlined'
                                    fullWidth
                                    id='address'
                                    label='address'
                                    autoFocus
                                    value={address}
                                    onChange={inputAddress}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='email'
                                    name='email'
                                    variant='outlined'
                                    fullWidth
                                    id='email'
                                    label='Email'
                                    autoFocus
                                    value={email}
                                    onChange={inputEmail}
                                />
                            </Grid>
                        </Grid>
                        <Grid container className={classes.buttonContainer}>
                            <Grid item xs={4}>
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                    onClick={() => handleSubmit()}
                                >
                                    Create
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    type='cancel'
                                    variant='outlined'
                                    color='primary'
                                    className={classes.submit}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Grid item xs={false} sm={2} md={2}>
                {/*
            right sidebar
        */}
            </Grid>
        </Grid>
    );
}
