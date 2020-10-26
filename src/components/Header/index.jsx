import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import SpeedSwitch from '../SpeedSwitch';
import { Menu as MenuIcon, InfoOutlined } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import clsx from 'clsx';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  switch: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: { display: 'none' },
}));

const Header = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { viewStore } = useContext(StoreContext);

  return (
    <AppBar
      position="sticky"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: viewStore.drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" className={classes.title}>
          Brad's Transmision Client
        </Typography>
        <SpeedSwitch className={classes.switch} />
        {/* <Typography>
          There are {viewStore.selectedTorrents.length} torrents selected.
        </Typography> */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="more-info"
          onClick={(e) => viewStore.toggleDrawer()}
          className={clsx(viewStore.drawerOpen && classes.hide)}
        >
          <InfoOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default observer(Header);
