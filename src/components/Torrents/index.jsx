import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TorrentTable from '../TorrentTable';
import TorrentDrawer from '../TorrentDrawer';
import { StoreContext } from '../../stores';

const drawerWidth = 300;

const styles = (theme) => ({
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
});

class Torrents extends React.Component {
  static contextType = StoreContext;
  viewStore = this.context.viewStore;
  torrentStore = this.context.torrentStore;

  componentDidMount() {
    this.torrentStore.fetchTorrents();
    setInterval(() => {
      this.torrentStore.fetchTorrents();
    }, 5000);
  }

  render() {
    const { classes } = this.props;

    const { viewStore, torrentStore } = this.context;
    let torrents = [];
    if (torrentStore.populated) torrents = torrentStore.torrents;
    const open = viewStore.drawerOpen;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <TorrentTable torrents={torrents} />
        </main>
        <TorrentDrawer />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(observer(Torrents));
