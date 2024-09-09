import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import CreateIcon from "@material-ui/icons/Create";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PieChartIcon from '@mui/icons-material/PieChart';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signOut } from "../../actions/action";

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const { window, history } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const matches = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (newOpen) => () => {
    setOpen(!newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const rightSideData = [
    {
      text: "Dashboard",
      icon: <PieChartIcon />,
      onClick: () => history.push("/dashboard/"),
    },
    {
      text: "New Job",
      icon: <CreateIcon />,
      onClick: () => history.push("/create/job"),
    },
    {
      text: "Jobs",
      icon: <SelectAllIcon />,
      onClick: () => history.push("/view/jobs"),
    },
    {
      text: "Logout",
      icon: <SettingsPowerIcon />,
      onClick: (() => dispatch(signOut(matches))),
    },
  ];

  return (
    <Root inputProps={{MenuProps: {disableScrollLock: true}}}>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />

      <SwipeableDrawer
        disableScrollLock
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Box sx={{ textAlign: 'center', pt: 1 }}>
            <Button onClick={toggleDrawer(open)}><KeyboardArrowUpIcon /></Button>
          </Box>
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}></Typography>
        </StyledBox>
        <StyledBox
          id='styledBox'
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <List>
            {rightSideData.map(({ text, icon, onClick }) => (
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(SwipeableEdgeDrawer)