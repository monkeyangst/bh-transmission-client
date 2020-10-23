import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import WithAside from '../WithAside';
import TorrentStats from '../TorrentStats';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Container,
  Drawer,
  Typography,
  Divider,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TorrentTable from '../TorrentTable';

import clsx from 'clsx';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 600,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const Torrents = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const context = useContext(StoreContext);
  const open = context.viewStore.drawerOpen;

  const handleDrawerToggle = () => {
    console.log('Should be toggling');
    context.viewStore.toggleDrawer();
  };

  return (
    <WithAside aside={<TorrentStats />} showAside={open}>
      <main>
        <TorrentTable />
      </main>
    </WithAside>
  );
};
export default observer(Torrents);
