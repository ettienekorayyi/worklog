import React from "react";
import RightSideBar from "./RightSideBar";
import SwipeableEdgeDrawer from "./SwipeableEdgeDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navigation = () => {
    //const matches = useMediaQuery('(min-width:600px)');

    return (
        <>
            {
                /* matches === false
                ? <RightSideBar />
                : */
                <SwipeableEdgeDrawer />
            }
        </>
    );
};

export default Navigation;
