import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
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
const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));
const TorrentDrawer = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { viewStore, torrentStore } = useContext(StoreContext);
  const selectedTorrents = viewStore.selectedTorrents;
  let drawerContent = '';

  if (selectedTorrents.length > 1) {
    console.log('MANY TORRENTS');
    drawerContent = <p>More than one torrent is selected</p>;
  } else if (selectedTorrents.length === 0) {
    drawerContent = <p>No torrents are selected</p>;
  } else {
    // Only one torrent is selected -- get info about that torrent
    const torrentId = selectedTorrents[0];
    console.log(torrentId);
    const torrent = torrentStore.getTorrent(torrentId);
    drawerContent = <Container>{torrent.name}</Container>;
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={viewStore.drawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={(e) => viewStore.toggleDrawer()}>
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {drawerContent}
    </Drawer>
  );
};
export default observer(TorrentDrawer);
