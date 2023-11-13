import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../../actions/action";
import { getInventory } from "../../selector/inventorySelector";
import Button from '@material-ui/core/Button';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {push} from 'connected-react-router';


export default function InventoryList() {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const items = getInventory(selector);


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
                 let id = params.row.id
                console.log(id)
                dispatch(push('/detail/inventory/' + id))
            }}
          >
            <MenuBookIcon />
          </Button>
        );
      }


    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Item Name",
            width: 150,
        },
        {
            field: "quantity",
            headerName: "Qty",
            //   type: 'number',
            width: 100,
        },
        {
            field: "supplier",
            headerName: "Supplier",
            width: 130,
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
        dispatch(fetchInventory());
    }, []);

    return (
      <>
        <p style={{color: "#1a1a1a", fontFamily: "Poppins", fontSize: "28px"}}>
          Inventories
        </p>      
        <div style={{ height: 600, width: "90%", margin:"auto", maxWidth:800}}>
            <DataGrid
                rows={items}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                // checkboxSelection
                // disableSelectionOnClick
            />
        </div>
      </>  
    );
}
