import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TorrentTable from '../TorrentTable';
import TorrentDrawer from '../TorrentDrawer';
import { StoreContext } from '../../stores';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(),
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
  const theme = useTheme();
  const classes = useStyles(theme);

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
