import React, { useContext } from 'react';
import { formatBytes } from '../../util/calc';
import { StoreContext } from '../../stores';
import { Container, Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const TorrentStats = (props) => {
  const classes = useStyles();
  const { viewStore, torrentStore } = useContext(StoreContext);
  let statsArea = (
    <CardContent>
      <Typography>There are no torrents selected.</Typography>
    </CardContent>
  );
  if (viewStore.selectedTorrents && viewStore.selectedTorrents.length > 0) {
    const index = viewStore.selectedTorrents[0];
    const torrent = torrentStore.torrents[index];

    statsArea = (
      <CardContent>
        <Typography variant="body2">
          <strong>Downloaded:</strong> {formatBytes(torrent.downloadedEver)}
        </Typography>
        <div>
          <strong>Uploaded:</strong> {formatBytes(torrent.uploadedEver)}
        </div>
        <div>
          <strong>Rate down:</strong> {formatBytes(torrent.rateDownload)}/s
        </div>
        <div>
          <strong>Rate up:</strong> {formatBytes(torrent.rateUpload)}/s
        </div>
        <div>
          <strong>Ratio:</strong> {torrent.uploadRatio}
        </div>
        <div>
          <strong>Seed Ratio Limit:</strong> {torrent.seedRatioLimit}
        </div>
      </CardContent>
    );
  }

  return (
    <Container className={classes.root}>
      <Card>{statsArea}</Card>
    </Container>
  );
};
export default observer(TorrentStats);
