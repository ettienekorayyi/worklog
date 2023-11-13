import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { updateTrader, getTraderData} from "../../actions/action";



const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginTop:'2rem',
        marginLeft:'2rem',


    },
    paper: {
      margin: theme.spacing(2, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingTop: '5vh',
    },
  
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 2, 3, 6),
    },
  }));
  
  export default function TradieProfileForm() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const trader = useSelector(state => state.trader)

    const [firstname, setFirstname] = useState(""),
        [lastname, setLastname] = useState(""),
        [email, setEmail] = useState(""),
        [phone, setPhone] = useState(""),
        [description, setDescription] = useState(""),
        [password, setPassword] = useState("");

    const inputFirstname = useCallback(
        (event) => {
            setFirstname(event.target.value);
        },
        [setFirstname]
    );

    const inputLastname = useCallback(
      (event) => {
          setLastname(event.target.value);
      },[setLastname]);

    const inputPhone = useCallback(
        (event) => {
            setPhone(event.target.value);
        },[setPhone]);

    const inputEmail = useCallback(
        (event) => {
            setEmail(event.target.value);
        },[setEmail]);

    const inputPassword = useCallback(
        (event) => {
            setPassword(event.target.value);
        },[setPassword]);

        const inputDescription = useCallback(
          (event) => {
              setDescription(event.target.value);
          },[setDescription]);

        useEffect(() => {
          dispatch(getTraderData())
          setFirstname(trader.firstname)
          setLastname(trader.lastname)
          setEmail(trader.email)
          setPhone(trader.phone)
          setDescription(trader.description)
        }, [trader.description])

        const handleSubmit= () => {
          if (firstname === "" || lastname === "" ||email === "" || password === "" ){
              alert ("Please fill in the form.")
              return false
          }
          dispatch(updateTrader(firstname, lastname,  email, password, description, phone))
          }
        

  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={2} md={2}>
        {/*
            Left Side Bar
        */}
        </Grid>
        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
            <div className={classes.header}>
                <h3>Tradie Details</h3>
                <h4>Tradie ID: 12345677</h4>
            </div>
          <div className={classes.paper}>
            <div className={classes.form}  >
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstname}
                  onChange={inputFirstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="name"
                  value={lastname}
                  onChange={inputLastname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="phone"
                  name="phone"
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone No"
                  autoFocus
                  value={phone}
                  onChange={inputPhone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={email}
                  onChange={inputEmail}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="passwordl"
                  value={password}
                  onChange={inputPassword}
                  type="password"
  
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.description}>
              <TextField
                autoComplete="text"
                variant="outlined"
                fullWidth
                id="Description"
                label="description"
                name="description"
                value={description}
                onChange={inputDescription}
                rows={5}
                multiline={true}

              />
            </Grid>
              

            </Grid >
            <Grid container className={classes.buttonContainer}>
                <Grid item xs ={4}>
                  <Button 
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => handleSubmit()}
                  >
                  CONFIRM
                  </Button>
                </Grid>
                <Grid item xs ={4}>
                  <Button 
                  type="cancel"
                  variant="outlined"
                  color="primary"
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