import {
  LinearProgress,
  Box,
  makeStyles,
  withStyles,
  withTheme,
  Grid,
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { formatBytes } from '../../util/calc';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'Red',
  },
  paused: {
    color: theme.palette.error.main,
  },
  error: {
    color: theme.palette.error.main,
  },
  ratio: {
    marginLeft: '10px',
  },
  stats: {
    marginTop: theme.spacing(),
    fontSize: '.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: '.7rem',
  },
  speeds: {
    justifyContent: 'center',
  },
}));

const getProgressStyle = (torrent, theme) => {
  let progressFg = theme.palette.primary.dark;
  let progressBg = '#cccccc';

  switch (torrent.status) {
    case 7:
      progressFg = theme.palette.error.dark;
      progressBg = theme.palette.error.light;
      break;
    case 6:
    case 5:
      progressFg = theme.palette.success.dark;
      progressBg = theme.palette.success.light;

      break;
    case 4:
    case 3:
    default:
      progressFg = theme.palette.info.dark;
      progressBg = '#cccccc';

      break;
    case 2:
    case 1:
      progressFg = theme.palette.error.dark;
      progressBg = theme.palette.error.light;
      break;
    case 0:
      progressFg = '#cccccc';
      progressBg = '#e0e0e0';
      break;
  }
  if (torrent.isFinished) {
    progressFg = '#424242';
    progressBg = '#bdbdbd';
  }
  return {
    root: {
      backgroundColor: progressBg,
      height: 6,
      borderRadius: 20,
    },
    bar: {
      backgroundColor: progressFg,
      borderRadius: 20,
    },
  };
};

const TorrentStats = (props) => {
  let { torrent, classes, done } = props;

  const speeds = torrent.isStopped ? (
    <span className={classes.paused}> Paused </span>
  ) : (
    <>
      {' '}
      <Grid item>
        <ArrowDownward className={classes.arrow} />
      </Grid>
      <Grid item>
        <div>{formatBytes(torrent.rateDownload)}/s</div>
      </Grid>
      <Grid item>
        <ArrowUpward className={classes.arrow} />
      </Grid>
      <Grid item>
        <div>{formatBytes(torrent.rateUpload)}/s</div>
      </Grid>
    </>
  );
  return (
    <Grid container className={classes.stats} justify="space-evenly">
      <Grid item md={2}>
        <div>
          <strong>Ratio:</strong>&nbsp;
          {Number.parseFloat(torrent.uploadRatio).toFixed(2)}
        </div>
      </Grid>
      <Grid item container md={8} className={classes.speeds}>
        {speeds}
      </Grid>
      <Grid item md={2}>
        <div>{`${Math.round(done)}%`}</div>
      </Grid>
    </Grid>
  );
};

const TorrentProgress = (props) => {
  let { torrent, theme } = props;

  const TestProgress = withStyles(getProgressStyle(torrent, theme))(
    LinearProgress
  );

  let percentDone = torrent.percentDone * 100;
  if (torrent.status === 6 && torrent.uploadRatio < 1)
    percentDone = torrent.uploadRatio * 100;
  else if (torrent.status === 2) percentDone = torrent.recheckProgress * 100;
  const classes = useStyles(theme);

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <TestProgress variant="determinate" value={percentDone} />
        <TorrentStats classes={classes} torrent={torrent} done={percentDone} />
      </Box>
    </Box>
  );
};
export default withTheme(TorrentProgress);
