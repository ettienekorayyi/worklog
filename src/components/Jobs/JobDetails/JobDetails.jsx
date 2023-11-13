import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from "react-redux";
import Lookup from '../../../common/Lookup';
import AlertModal from '../../../common/AlertModal';
import SimpleBackdrop from "../../Loading/SimpleBackdrop";
import { getStatus } from "../../../actions/action";
import { getCustomers } from "../../../actions/customerActions";
import { updateJob, getJob } from '../../../actions/action';
import './jobdetails.css';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const useStyles = makeStyles(() => ({
    root: { height: '62rem', },
  }));

const JobDetails = (props) => { 
    const { rows } = props;
    const classes = useStyles();
    const jobs = rows === undefined ? {} : rows.rows; 
    const { customers, job } = useSelector((state) => state);
    const custId = job.payload === undefined ? {} : job.payload.customer?.user_id;

    const [jobId, setJobId] = useState({});
    const [jobName, setJobName] = useState({});
    const [jobAddress, setJobAddress] = useState({});
    const [description, setDescription] = useState({});
    const [notes, setNotes] = useState({});
    
    const [errors, setErrors] = useState({
        jobName: { helperText: '', fieldError: false },
        description: { helperText: '', fieldError: false },
        tradesperson_id: { helperText: '', fieldError: false },
        customer_id: { helperText: '', fieldError: false },
    });

    const jstatus = jobs.payload === undefined ? {} : job.payload.job_status;

    const [customerName, setCustomerName] = useState('');
    const [customerId, setCustomerId] = useState(custId);
    const [jobStatus, setJobStatus] = useState(jstatus?.name); // put inside useeffect
    const [jobStatusId, setJobStatusId] = useState(jstatus.id);// put inside useeffect
    const status = useSelector((state) => state.status.job);
    
    const indicator = useSelector((state) => state.job.loading);
    const matches = useMediaQuery('(max-width:600px)');

    const dispatch = useDispatch();
    //console.log(job.payload.customer)
    useEffect(() => {
        dispatch(getStatus());
        dispatch(getCustomers());
        if(jobs?.row?.id !== undefined) dispatch(getJob(jobs?.row?.id));
        if(job.payload !== undefined) {
            setJobId(job.payload.id);
            setJobName(job.payload.name);
            setJobAddress(job.payload.address);
            setCustomerName(`${job.payload.customer?.first_name} ${job.payload.customer?.last_name}`);
            setDescription(job.payload.description);
            setNotes(job.payload.notes);
        }
    }, [indicator,job.payload]);

    let jobObject = {
        id: jobId,
        name: jobName,
        address: jobAddress,
        description: description,
        job_status_id: jobStatusId,
        customer_id: customerId,
        notes: notes
    }

    const handleUserInput = event => {
        const { name, value } = event.target;
        let { helperText, fieldError } = fieldValidator(value, name);

        if (name === "jobName") {
            setJobName(value);
            switch (fieldError) {
                case false:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                case true:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                default:
                    break;
            }
        }
        if (name === "description") {
            setDescription(value);

            switch (fieldError) {
                case false:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                case true:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                default:
                    break;
            }
        }

        /**/
        if (name === "address") {
            setJobAddress(value);
            switch (fieldError) {
                case false:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                case true:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                default:
                    break;
            }
        }
        /**/
        if (name === "notes") {
            setNotes(value);
            switch (fieldError) {
                case false:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                case true:
                    setErrors({ [name]: { helperText, fieldError } });
                    break;
                default:
                    break;
            }
        }

    };


    const fieldValidator = (field, fieldName) => {
        const fieldLimitReach = fieldName === 'jobName' ? /^.{29,30}$/ : /^.{99,100}$/;

        if (field === '') {
            return {
                helperText: 'field is empty.',
                fieldError: true
            }
        }
        else if (field.length > 0 && fieldLimitReach.test(field) === false) {

            return {
                helperText: '',
                fieldError: false
            }
        }
        else if (fieldLimitReach.test(field) === true) {
            return {
                helperText: 'Maximum character limit reached.',
                fieldError: true
            }
        }
    };

    const handleDropdownChange = (event, params) => {
        const { name, selectedIndex, childNodes, value } = event.target;
        let { helperText, fieldError } = fieldValidator(value, name);//

        switch (name) {
            case 'job_status_id':
                {
                    const index = selectedIndex;
                    const el = childNodes[index]
                    const option = el.getAttribute('id');

                    setJobStatus(value)
                    setJobStatusId(Number(option));
                    break;
                }
            case 'customer_id':
                {
                    const { user_id } = params.props;

                    if (user_id !== 0) setCustomerId(user_id);

                    if (fieldError === false) {
                        setCustomerName(value);
                        setErrors({ [name]: { helperText, fieldError } });
                    }
                    if (fieldError === true) {
                        setErrors({ [name]: { helperText, fieldError } });
                        console.log(errors)
                    }

                    break;
                }
            default:
                console.log('error')
                break;
        }
    };


    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateJob(jobObject));
        resetFields();
    };

    const resetFields = () => {
        jobObject = {
            customer_id: '',
            description: '',
            jobName: '',
            job_status_id: 1,
            tradesperson_id: ''
        };
        setJobName('');
        setDescription('');
        setJobStatus('Not yet started');
        setJobStatusId(1);
    }

    return (
        <Box
            sx={{
                '& .MuiTextField-root': {
                    m: 1,
                    width: matches === false
                        ? '22vw'
                        : '70vw !important'
                    
                },
            }}
            className={classes.root}
        >
            <p className='title'>Job Details</p>
            <Paper
                elevation={3}
                component="form"
                
                onSubmit={handleSubmit}
            >
                <Item className="item">
                    <TextField
                        value={jobId}
                        name='jobId'
                        disabled
                        id="outlined-error-helper-text"
                        label="Job ID"
                        variant="outlined"
                    />
                    <TextField
                        error={errors.jobName === undefined ? false : errors.jobName.fieldError}
                        helperText={errors.jobName === undefined ? false : errors.jobName.helperText}
                        value={jobName}
                        name='jobName'
                        required
                        id="outlined-error-helper-text"
                        label="Job Name"
                        variant="outlined"
                        onBlur={handleUserInput}
                        onChange={handleUserInput}
                    />
                    <TextField
                        //error={errors.jobName === undefined ? false : errors.jobName.fieldError}
                        //helperText={errors.jobName === undefined ? false : errors.jobName.helperText}
                        value={jobAddress}
                        name='jobAddress'
                        required
                        id="outlined-error-helper-text"
                        label="Job Address"
                        variant="outlined"
                        onBlur={handleUserInput}
                        onChange={handleUserInput}
                    />

                    <TextField
                        required
                        id="outlined-select-currency-native"
                        select
                        name='job_status_id'
                        value={jobStatus}
                        onChange={handleDropdownChange}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {status.map((option, key) => (
                            <option key={key} value={option.name} id={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>

                    <Lookup
                        data={customers.payload}
                        customerName={customerName}
                        handleDropdownChange={handleDropdownChange}
                        errors={errors}
                    />

                    <TextField
                        error={errors.description === undefined ? '' : errors.description.fieldError}
                        helperText={errors.description === undefined ? '' : errors.description.helperText}
                        value={description}
                        name='description'
                        multiline
                        rows={6}
                        id="outlined-error-helper-text"
                        label="Description"
                        variant="outlined"
                        onBlur={handleUserInput}
                        onChange={handleUserInput}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Notes"
                        name='notes'
                        multiline
                        rows={6} 
                        value={notes}
                        onBlur={handleUserInput}
                        onChange={handleUserInput}
                    />
                </Item>
                <Item>
                    <div>
                        <Button
                            id='jobDetailsButton'
                            variant="contained"
                            style={{ 
                                backgroundColor: "#000000", 
                                color: "#fff",
                                padding: '8px 22px',
                                borderRadius: '4px'
                              }}
                            onClick={handleSubmit}
                        >
                            Update
                        </Button>
                        {
                            job.showModal === true
                                ? <AlertModal showModal={job.showModal} text='updated' />
                                : null
                        }

                    </div>
                </Item>
            </Paper>

            <SimpleBackdrop loading={indicator} /> {/**/}

        </Box >
    );
}

export default JobDetails;