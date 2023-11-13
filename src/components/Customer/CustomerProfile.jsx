import React, {useState, useCallback, useEffect} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import taskstechApi from '../../api/taskstechApi';
import { useDispatch } from "react-redux";
import {updateCustomer} from "../../actions/customerActions"
// import { push } from 'connected-react-router';


const useStyles = makeStyles((theme) => ({
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
      margin: theme.spacing(2, 2),
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

export default function InventoryDetail() {
  const [firstName, setFirstName] = useState(""),
            [lastName, setLastName] = useState(""),
            [email, setEmail] = useState(""),
            [address, setAddress] = useState(""),
            [phone, setPhone] = useState("");

    let id = window.location.pathname.split('/detail/customer')[1];
    if(id !== ""){
    id = id.split('/')[1];
    }

  const classes = useStyles();
  const dispatch = useDispatch();

  const inputFirstName = useCallback(
    (event) => {
        setFirstName(event.target.value);
    },
    [setFirstName]
);
    const inputLastName = useCallback(
    (event) => {
        setLastName(event.target.value);
    },
    [setLastName]
    );
    const inputEmail = useCallback(
        (event) => {
            setEmail(event.target.value);
        },
        [setEmail]
        );
        
    const inputAddress = useCallback(
    (event) => {
        setAddress(event.target.value);
    },
    [setAddress]
    );
    const inputPhone = useCallback(
    (event) => {
        setPhone(event.target.value);
    },
    [setPhone]
    );
   

    
    useEffect(async () => {
        if(id !==""){
            const token = localStorage.getItem('token');
        try {
            taskstechApi.get(`/users/customer/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            })
                .then(res => {
                    setFirstName(res.data.first_name)
                    setLastName(res.data.last_name)
                    setEmail(res.data.email)
                    setAddress(res.data.address)
                    setPhone(res.data.phone)
                })
        } catch (error) {
            console.log(error.message)
        }
        }
        }, [])

  const handleUpdate= () => {
    if (firstName === "" || lastName === "" || phone === "" ){
        alert ("Please fill in the form.")
        return false
    }
    let customerData = {
        first_name:firstName,
         last_name:lastName,
         address:address,
        phone:phone,
        email:email,
    }
    dispatch(updateCustomer(customerData, id))
  }

  return (
    <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={2} md={2}>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={8}
                component={Paper}
                elevation={6}
                square={false}
            >
                <div className={classes.header}>
                    <h3>Customer Details</h3>
                </div>
                <div className={classes.paper}>
                    <div
                        className={classes.form}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    value={firstName}
                                    onChange={inputFirstName}
                                />
                                
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    id="lastName"
                                    label="LastName"
                                    value={lastName}
                                    onChange={inputLastName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    value={email}
                                    onChange={inputEmail}
                                    disabled={true}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="address"
                                    name="address"
                                    variant="outlined"
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    value={address}
                                    onChange={inputAddress}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="phone"
                                    variant="outlined"
                                    fullWidth
                                    id="phone"
                                    label="Phone"
                                    value={phone}
                                    type="number"
                                    onChange={inputPhone}
                                />
                            </Grid>
                           
                           
                        </Grid>
                        <Grid container className={classes.buttonContainer}>
                            <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={() => handleUpdate()}

                                >
                                    UPDATE
                                </Button>
                            </Grid>
                            {/* <Grid item xs={4}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.submit}
                                    // onClick={deleteInventory(iid)}
                                    onClick={()=>handleDelete()}
                                >
                                    DELETE
                                </Button>
                            </Grid> */}
                            
                        </Grid>
                    </div>
                </div>
            </Grid>
            <Grid item xs={false} sm={2} md={2}>
            </Grid>
        </Grid>
  );
}

    
