import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TorrentTable from '../TorrentTable';
import TorrentDrawer from '../TorrentDrawer';
import { StoreContext } from '../../stores';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
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

function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const { viewStore } = useContext(StoreContext);
  const open = viewStore.drawerOpen;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <TorrentTable />
      </main>
      <TorrentDrawer />
    </div>
  );
}

export default observer(PersistentDrawerRight);
