import React, { useContext } from 'react';
import { formatBytes } from '../../util/calc';
import { StoreContext } from '../../stores';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: 'Yellow',
  },
  title: {
    fontWeight: 'bold',
    flexGrow: 1,
  },
  table: {
    backgroundColor: 'red',
  },
}));

const TorrentStats = (props) => {
  const torrent = props.torrent;
  const classes = useStyles();
  const { viewStore, torrentStore } = useContext(StoreContext);
  const statsArea = (
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

  return (
    <div className={classes.root}>
      <Typography variant="body2" className={classes.title}>
        {torrent.name}
      </Typography>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell>Have:</TableCell>
            <TableCell>
              <Typography variant="body2">
                {formatBytes(torrent.haveValid)} ({torrent.percentDone * 100}%)`
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Availability:</TableCell>
            <TableCell>{torrent.percentDone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default observer(TorrentStats);
