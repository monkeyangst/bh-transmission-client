import { LinearProgress, Box, withStyles, Typography } from '@material-ui/core';
import React from 'react';
import { green, blue, grey } from '@material-ui/core/colors';

const styles = {
  root: {
    height: 8,
    borderRadius: 4,
  },
  percentage: {
    fontSize: '.75em',
  },
  colorPrimary: {
    background: '#cccccc',
  },
  barColorPrimary: {
    background: 'Red',
  },
  colorDownloading: {
    background: '#b0bec5',
  },
  barColorDownloading: {
    background: blue[800],
  },
  colorSeeding: {
    background: green[200],
  },
  barColorSeeding: {
    background: green[800],
  },
  colorStopped: {
    background: grey[200],
  },
  barColorStopped: {
    background: grey[500],
  },
};

const TorrentProgress = (props) => {
  let { torrent, classes } = props;
  let percentDone = torrent.percentDone * 100;
  let colorPrimary = classes.colorPrimary;
  let barColorPrimary = classes.barColorPrimary;

  if (torrent.status === 6) {
    colorPrimary = classes.colorSeeding;
    barColorPrimary = classes.barColorSeeding;
    if (torrent.uploadRatio < 1) percentDone = torrent.uploadRatio * 100;
  }
  if (torrent.status === 4) {
    colorPrimary = classes.colorDownloading;
    barColorPrimary = classes.barColorDownloading;
  }
  if (torrent.status === 2) {
    percentDone = torrent.recheckProgress;
  }
  if (torrent.status === 0) {
    colorPrimary = classes.colorStopped;
    barColorPrimary = classes.barColorStopped;
  }

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          color="primary"
          classes={{ root: classes.root, colorPrimary, barColorPrimary }}
          variant="determinate"
          value={percentDone}
        />
      </Box>
      <Box minWidth="2em">
        <Typography className={classes.percentage} color="textSecondary">
          {`${Math.round(percentDone)}%`}
        </Typography>
      </Box>
    </Box>
  );
};
export default withStyles(styles)(TorrentProgress);
