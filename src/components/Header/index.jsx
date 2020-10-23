import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu as MenuIcon, InfoOutlined } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { viewStore } = useContext(StoreContext);

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Brad's Transmision Client
        </Typography>
        <Typography>
          There are {viewStore.selectedTorrents.length} torrents selected.
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="more-info"
          onClick={(e) => viewStore.toggleDrawer()}
        >
          <InfoOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default observer(Header);
