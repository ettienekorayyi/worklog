import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
//import HighlightIcon from "@material-ui/icons/Highlight";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    marginRight: "auto",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' style={{backgroundColor: 'rgb(0, 0, 0)', color: "#F0F0F0", fontFamily: "Poppins", fontSize: "30px", fontWeight: "500" }}>
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          <p style={{backgroundColor: 'rgb(0, 0, 0)', color: "#F0F0F0", fontFamily: "Poppins", fontSize: "30px", fontWeight: "500" }}>
          worklog
          </p>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
