import React, { useEffect } from "react";
import {
    DataGrid,
    GridToolbarFilterButton,
  } from '@mui/x-data-grid';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';


import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../actions/customerActions";
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {push} from 'connected-react-router';
// import { getCustomersList } from "../../selector/customerSelector";


const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) => ({
    root: {
      padding: theme.spacing(0.5, 0.5, 0),
      justifyContent: 'end',
      display: 'flex',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
    },}),
  { defaultTheme },
);

function QuickSearchToolbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <GridToolbarFilterButton />
    </div>
  );
}




export default function CustomerList() {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state.customers.payload)

    const handleClick = (cellValues) => {
        cellValues
      };

    const viewDetail = params => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
                handleClick(params)
                 let id = params.row.user_id
                console.log(id)
                dispatch(push('/detail/customer/' + id))
            }}
          >
            <MenuBookIcon />
          </Button>
        );
      }

      function getFullName(params){
          return `${params.getValue(params.id, 'first_name') || ''} ${
            params.getValue(params.id, 'last_name') || ''
          }`;
      }


    const columns = [
        { field: "user_id", headerName: "ID", width: 90 },
        {
            field: "first_name",
            headerName: "First Name",
            width: 250,
            hide:true,
        },
        {
            field: "last_name",
            headerName: "Last Name",
            width: 250,
            hide:true,
        },
        {
            field: "fullName",
            headerName: "Full Name",
            width: 220,
            valueGetter:getFullName,
        },
        {
            field: "address",
            headerName: "Address",
            width: 220,
        },
        {
            field: "phone",
            headerName: "Phone No",
            width: 150,
        },
        {
            field: 'link',
            headerName: 'View Detail',
            sortable: false,
            width: 140,
            renderCell: viewDetail
          },
    ];

    useEffect(() => {
        dispatch(getCustomers())
    }, []);

    return (
        <>
        <p style={{color: "#1a1a1a", fontFamily: "Poppins", fontSize: "28px"}}>
          Customers
        </p>
        <div style={{ height: 600, width: "90%", margin:"auto", maxWidth:800}}>
            <DataGrid
                components={{ Toolbar: QuickSearchToolbar }}
                rows={state}
                getRowId = {(row) =>row.user_id}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                density="compact"
            />
        </div>
        </>
    );
}