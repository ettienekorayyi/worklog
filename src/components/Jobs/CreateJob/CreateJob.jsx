import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import TextField from '@mui/material/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AlertModal from '../../../common/AlertModal'

import Lookup from '../../../common/Lookup'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBackdrop from '../../Loading/SimpleBackdrop'
import { getStatus } from '../../../actions/action'
import { createJob } from '../../../actions/action'
import { useState } from 'react'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

const CreateJob = () => {
  const [jobName, setJobName] = useState('')
  const [description, setDescription] = useState('')

  const [jobNameIsValid, setJobNameIsValid] = useState(false)
  const [descriptionIsValid, setDescriptionIsValid] = useState(false)
  const [customerNameIsValid, setCustomerNameIsValid] = useState(false)
  const [jobAddress, setJobAddress] = useState('')
  const [notes, setNotes] = useState('')

  const [errors, setErrors] = useState({
    jobName: { helperText: '', fieldError: false },
    description: { helperText: '', fieldError: false },
    tradesperson_id: { helperText: '', fieldError: false },
    customer_id: { helperText: '', fieldError: false }
  })

  const [customerName, setCustomerName] = useState('')
  const [customerId, setCustomerId] = useState(0)
  const [jobStatus, setJobStatus] = useState('Not yet started') //
  const [jobStatusId, setJobStatusId] = useState("c4a17ab4-316c-4dde-a606-29f7e37637e8") //
  const { customers, job, status } = useSelector(state => state) // console.log(state)
  const indicator = useSelector(state => state.job.loading)
  const matches = useMediaQuery('(max-width:600px)')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStatus())
    //dispatch(getCustomers())
  }, [indicator])

  let jobObject = {
    name: jobName,
    address: jobAddress,
    description: description,
    jobStatusId: jobStatusId,
    //customer_id: customerId,
    notes: notes
  }

  const handleUserInput = event => {
    const { name, value } = event.target
    let { helperText, fieldError } = fieldValidator(value, name)

    if (name === 'jobName') {
      setJobName(value)
      switch (fieldError) {
        case false:
          setJobNameIsValid(true)
          setErrors({ [name]: { helperText, fieldError } })
          break
        case true:
          setJobNameIsValid(false)
          setErrors({ [name]: { helperText, fieldError } })
          break
        default:
          break
      }
    }
    if (name === 'description') {
      setDescription(value)

      switch (fieldError) {
        case false:
          setDescriptionIsValid(true)
          setErrors({ [name]: { helperText, fieldError } })
          break
        case true:
          setDescriptionIsValid(false)
          setErrors({ [name]: { helperText, fieldError } })
          break
        default:
          break
      }
    }

    if (name === 'address') {
      setJobAddress(value)
      switch (fieldError) {
        case false:
          setErrors({ [name]: { helperText, fieldError } })
          break
        case true:
          setErrors({ [name]: { helperText, fieldError } })
          break
        default:
          break
      }
    }

    if (name === 'notes') {
      setNotes(value)
      switch (fieldError) {
        case false:
          setErrors({ [name]: { helperText, fieldError } })
          break
        case true:
          setErrors({ [name]: { helperText, fieldError } })
          break
        default:
          break
      }
    }
  }

  const fieldValidator = (field, fieldName) => {
    const fieldLimitReach =
      fieldName === 'jobName' ? /^.{29,30}$/ : /^.{99,100}$/

    if (field === '') {
      return {
        helperText: 'field is empty.',
        fieldError: true
      }
    } else if (field.length > 0 && fieldLimitReach.test(field) === false) {
      return {
        helperText: '',
        fieldError: false
      }
    } else if (fieldLimitReach.test(field) === true) {
      return {
        helperText: 'Maximum character limit reached.',
        fieldError: true
      }
    }
  }

  const handleDropdownChange = (event, params) => {
    const { name, selectedIndex, childNodes, value } = event.target
    let { helperText, fieldError } = fieldValidator(value, name) //
    
    switch (name) {
      case 'job_status_id': {
        const index = selectedIndex
        const el = childNodes[index]
        const option = el.getAttribute('id')

        setJobStatus(value)
        setJobStatusId((option))
        break
      }
      case 'customer_id': {
        const { user_id } = params.props

        if (user_id !== 0) setCustomerId(user_id)

        if (fieldError === false) {
          setCustomerName(value)
          setCustomerNameIsValid(true)
          setErrors({ [name]: { helperText, fieldError } })
          //console.log(errors)
        }
        if (fieldError === true) {
          setCustomerNameIsValid(false)
          setErrors({ [name]: { helperText, fieldError } })
          //console.log(errors)
        }

        break
      }
      default:
        //console.log('error')
        break
    }
  }

  const isNotValid = () => {
    if (jobNameIsValid && descriptionIsValid) { // && customerNameIsValid
      return false
    } else {
      return true
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    //debugger;
    dispatch(createJob(jobObject))
    resetFields()
  }

  const resetFields = () => {
    jobObject = {
      //customer_id: '',
      description: '',
      jobName: '',
      //job_status_id: 1,
      tradesperson_id: ''
    }
    setJobName('')
    setDescription('')
    setJobStatus('Not yet started')
    setJobStatusId(1)
  }

  //console.log(job)
  return (
    <Box
      sx={{
        '& .MuiTextField-root': {
          m: 1,
          width: matches === false ? '22vw' : '70vw !important'
        }
      }}
    >
      <Paper
        elevation={3}
        component='form'
        sx={{
          width: matches === false ? '40vw' : '80vw',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2.5rem',
          marginBottom: '5rem'
        }}
        onSubmit={handleSubmit}
      >
        <Item>
          <Typography component='div' variant='h4'>
            Create New Job
          </Typography>
          <Typography sx={{ margin: '0' }} variant='subtitle2' gutterBottom>
            Please fill the job details
          </Typography>
          <Typography variant='subtitle2' gutterBottom>
            *Required
          </Typography>
        </Item>
        <Item>
          <div>
            <TextField
              error={
                errors.jobName === undefined ? false : errors.jobName.fieldError
              }
              helperText={
                errors.jobName === undefined ? false : errors.jobName.helperText
              }
              value={jobName}
              name='jobName'
              required
              id='outlined-error-helper-text'
              label='Job Name'
              variant='outlined'
              onBlur={handleUserInput}
              onChange={handleUserInput}
            />
          </div>
          <div>
            <TextField
              error={
                errors.jobName === undefined ? false : errors.jobName.fieldError
              }
              helperText={
                errors.jobName === undefined ? false : errors.jobName.helperText
              }
              value={jobAddress}
              name='address'
              required
              id='outlined-error-helper-text'
              label='Job Address'
              variant='outlined'
              onBlur={handleUserInput}
              onChange={handleUserInput}
            />
          </div>
          <div>
            <TextField
              error={ 
                errors.description === undefined
                  ? false // ''
                  : errors.description.fieldError
              }
              helperText={
                errors.description === undefined
                  ? false // ''
                  : errors.description.helperText
              }
              value={description}
              name='description'
              id='outlined-error-helper-text'
              label='Description'
              variant='outlined'
              onBlur={handleUserInput}
              onChange={handleUserInput}
            />
          </div>
          <div>
            <TextField
              required
              id='outlined-select-currency-native'
              select
              name='job_status_id'
              value={jobStatus}
              onChange={handleDropdownChange}
              SelectProps={{
                native: true
              }}
              variant='outlined'
            >
              {status?.payload?.map((option, key) => (
                    <option key={key} value={option.name} id={option.id}>
                      {option.name}
                    </option>
              ))}
            </TextField>
          </div>
          {/* 
                    <div>
                        <Lookup
                            data={customers.payload}
                            customerName={customerName}
                            handleDropdownChange={handleDropdownChange}
                            errors={errors}
                        />
                    </div>
                    */}
          <div>
            <TextField
              id='outlined-multiline-static'
              label='Notes'
              name='notes'
              multiline
              rows={6}
              value={notes}
              onBlur={handleUserInput}
              onChange={handleUserInput}
            />
          </div>
        </Item>
        <Item>
          <div>
            <Button
              disabled={isNotValid()}
              variant='contained'
              color='primary'
              style={{
                backgroundColor: (() => {
                  if (isNotValid() == false) return '#000000'
                })(),
                width: matches ? '65vw' : '22vw',
                height: '7vh'
              }}
              onClick={handleSubmit}
            >
              Create
            </Button>
            {job.showModal === true ? (
              <AlertModal showModal={job.showModal} item='job' text='created' />
            ) : null}
          </div>
        </Item>
      </Paper>
      <SimpleBackdrop loading={indicator} />
    </Box>
  )
}

export default CreateJob
