import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Container,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  InputLabel,
  Grid,
} from '@material-ui/core/';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { formatBytes } from '../../util/calc';
import TorrentStats from '../TorrentStats';
import SortMenu from '../SortMenu/';
import FilterMenu from '../FilterMenu';

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
  drawerContent: {
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectGrid: {
    padding: 0,
  },
}));
const TorrentDrawer = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { viewStore, torrentStore } = useContext(StoreContext);
  const selectedTorrents = viewStore.selectedTorrents;
  let drawerContent = '';

  if (selectedTorrents.length > 1) {
    drawerContent = <p>More than one torrent is selected</p>;
  } else if (selectedTorrents.length === 0) {
    drawerContent = <p>No torrents are selected</p>;
  } else {
    // Only one torrent is selected -- get info about that torrent
    const torrentId = selectedTorrents[0];
    const torrent = torrentStore.getTorrent(torrentId);
    console.log(torrent);
    drawerContent = <TorrentStats torrent={torrent} />;
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
      <Container class={classes.drawerContent}>
        <Grid container spacing={0} className={classes.selectGrid}>
          <Grid item lg={6}>
            <SortMenu />
          </Grid>
          <Grid item lg={6}>
            <FilterMenu />
          </Grid>
        </Grid>
        {drawerContent}
      </Container>
    </Drawer>
  );
};
export default observer(TorrentDrawer);
