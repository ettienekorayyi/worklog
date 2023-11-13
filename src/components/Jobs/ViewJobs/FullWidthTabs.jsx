import React, {  useEffect,useState } from 'react'; 
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel, a11yProps } from '../../../common/TabMenu/TabStyles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch,useSelector } from 'react-redux';  
import { getAllJobs } from '../../../actions/action';
import DataTable from './DataTable';
import ControlledAccordions from './ControlledAccordions';
import SearchBar from '../../../common/SearchBar';
import SimpleBackdrop from '../../Loading/SimpleBackdrop';


export const FullWidthTabs = ({ history, callback }) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const { jobs, searchResult } = useSelector((state) => state);
  const matches = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getAllJobs()) }, []);

  const handleChange = (event, newValue) => setValue(newValue);
  
  const completedJobs = {
    payload: jobs.payload.filter(job => {
      return job.job_status.name === 'Completed';
    })
  };

  const activeJobs = {
    payload: jobs.payload.filter(job => {
      return job.job_status.name === 'In progress';
    })
  };


  return (
    <Container maxWidth="lg" >
      <header>
        <p className='title'>Jobs</p>
        <SearchBar setSearchInitiated={setSearchInitiated} />
        <Button
          type='submit'
          fullWidth
          size="large"
          variant='contained'
          onClick={() => history.push("/create/job")}
          style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            backgroundColor: '#000000',
            padding: '8px 22px',
            borderRadius: '4px'
          }}
        >
          New Job
        </Button>
      </header>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: '#000', color: '#000' }
          }}
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Completed" {...a11yProps(1)} />
          <Tab label="Active" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction} >
        {
          matches === false
            ? <DataTable
              jobs={jobs}
              title='All'
              parentCallback={callback}
            />
            : <ControlledAccordions
              jobs={searchInitiated === true ? searchResult : jobs}
              parentCallback={callback}
              history={history} 
            />
        }
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction}>
        {
          matches === false
            ? <DataTable
              jobs={searchInitiated === true ? searchResult : completedJobs}
              title='All'
              parentCallback={callback}
            />
            : <ControlledAccordions
              jobs={completedJobs}
              parentCallback={callback}
            />
        }
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        {
          matches === false
            ? <DataTable
              jobs={activeJobs}
              title='All'
              parentCallback={callback}
            />
            : <ControlledAccordions
              jobs={activeJobs}
              parentCallback={callback}
            />
        }
      </TabPanel>
      <SimpleBackdrop loading={jobs?.loading} />
    </Container>
  );
}
