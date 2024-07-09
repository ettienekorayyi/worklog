import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));




export default function DataTable(props) {
  const { jobs, parentCallback } = props;
  const classes = useStyles();
  const rows = jobs.payload;

  const handleDiaryClick = (event, rows) => {
    const params = {
      rows,
      componentType: 'diary',
    };
    
    parentCallback(params);
  };
  console.log(props.stv)
  const handleJobDetailsClick = (event, rows) => {
    
    const params = {
      rows,
      componentType: 'jobDetails',
      detailsPath: `/view/jobs/details/${rows.jobId}`
    };
    
    parentCallback(params);
  };

  const renderDiaryElement = params => {

    return (
      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#000000" }}
        onClick={(event) => {
          handleDiaryClick(event, params);
        }}
      >
        <MenuBookIcon />
      </Button>
    );
  }

  const renderJobDetailsElement = params => {
    return (
      <Button
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#000000" }}
        onClick={(event) => {
          handleJobDetailsClick(event, params);
        }}
      >
        <InfoIcon />
      </Button>
    );
  }

  const columns = [
    { field: 'jobId', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 170,
      editable: true,
    },
    {
      field: 'job_status',
      headerName: 'Status',
      width: 130,
      editable: false,
      valueGetter: (params) => {
        return params.row.job_status.name;
      }
    },
    {
      field: 'diary',
      headerName: 'View Diary',
      sortable: false,
      width: 120,
      renderCell: renderDiaryElement
    },
    {
      field: 'details',
      headerName: 'Details',
      sortable: false,
      width: 120,
      renderCell: renderJobDetailsElement
    }
  ];

  useEffect(() => {
    window.onpopstate = e => {
      if (e.type === 'popstate') window.location.reload();
    }
  }, [])

  return (
    <div
      className={classes.root}
      style={{ height: 400, width: '100%' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        //checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

