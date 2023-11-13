import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
//import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";
//import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
//import PostAddIcon from "@material-ui/icons/PostAdd";
//import WorkIcon from "@material-ui/icons/Work";
import { withRouter } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { signOut } from "../../actions/action";



//Rigtht sidebar component

function RightSideBar({history}) {
    // Make use of makeStyle from material UI
    const useStyles = makeStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: "auto",
        },
    });
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, setState] = useState({
        left: false,
        right: false,
    });

    // Toggle the drawer
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // Information for the right side navigation ,The list of the items on the sidebar
    const rightSideData = [
        {
            text: "New Job",
            icon: <CreateIcon />,
            onClick: () => history.push("/create/job"),
        },
        {
            text: "Jobs",
            icon: <SelectAllIcon />,
            onClick: () => {
                history.push("/view/jobs")
                //window.location.reload()
            }
        },
        /* 
        ,
        {
            text: "New Customer",
            icon: <PersonAddIcon />,
            onClick: () => history.push("/create/customer"),
        },
        {
            text: "Customers",
            icon: <PeopleAltIcon />,
            onClick: () => history.push("/view/customers"),
        },
        {
            text: "New Inventory",
            icon: <PostAddIcon />,
            onClick: () => history.push("/create/inventory"),
        },
        {
            text: "Inventories",
            icon: <WorkIcon />,
            onClick: () => history.push("/list/inventory"),
        },
        */
        {
            text: "Logout",
            icon: <SettingsPowerIcon />,
            onClick: (() => dispatch(signOut())),
        },
    ];

    // The list of the items on the sidebar
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {/* Destructure the text, icon and onClick from RightSideData*/}
               
                {rightSideData.map(({ text, icon, onClick }) => (
                    <ListItem button key={text} onClick={onClick}>
                        {icon && <ListItemIcon>{icon}</ListItemIcon>}
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button  
                        style={{color: "#4e4af2", fontFamily: "Poppins", fontSize: "25px", fontWeight: "500"}} 
                        onClick={toggleDrawer(anchor, true)}>
                        MENU
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default withRouter(RightSideBar);
