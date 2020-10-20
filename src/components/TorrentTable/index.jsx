import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import TorrentProgress from '../TorrentProgress';
import { formatBytes } from '../../util/calc';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import StatusButton from '../StatusButton';

class TorrentTable extends React.Component {
  static contextType = StoreContext;
  state = {
    loading: true,
  };

  componentDidMount() {
    // console.log('TorrentList: --- componentDidMount()');
    // console.log(this.torrentStore);
    this.torrentStore.fetchTorrents();
    setInterval(() => {
      console.log('---');
      this.torrentStore.fetchTorrents();
    }, 5000);
  }

  startStopClicked(e, id, status) {
    if (status === 0) {
      this.torrentStore.startTorrent(e, id);
    } else {
      this.torrentStore.stopTorrent(e, id);
    }
  }

  render() {
    this.torrentStore = this.context.torrentStore;
    // console.log('POPULATED? ', this.torrentStore.populated);
    let torrents = [];
    if (this.torrentStore.populated) {
      torrents = this.torrentStore.torrents.map((torrent) => {
        // let selected = torrent.id === this.state.selected ? 1 : 0;
        return (
          <TableRow key={torrent.id}>
            <TableCell>
              <StatusButton
                click={(e) =>
                  this.startStopClicked(e, torrent.id, torrent.status)
                }
                status={torrent.status}
              />
              {torrent.status}
            </TableCell>
            <TableCell style={{ overflow: 'hidden' }}>{torrent.name}</TableCell>
            <TableCell align="center">
              <Typography variant="body2">
                {formatBytes(torrent.sizeWhenDone)}
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ width: '60%' }}>
              <TorrentProgress torrent={torrent} />
            </TableCell>
            <TableCell align="center">{torrent.peersConnected}</TableCell>
            <TableCell align="center">
              <Typography
                variant="body2"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowDownward fontSize="small" />
                <p>{formatBytes(torrent.rateDownload)}/s</p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <ArrowUpward fontSize="small" />
                <p>{formatBytes(torrent.rateUpload)}/s</p>
              </Typography>
            </TableCell>
          </TableRow>
        );
      });
    }

    return (
      <TableContainer>
        <Table style={{ tableLayout: 'fixed', fontSize: '.8em' }}>
          <colgroup>
            <col width="5%" />
            <col width="37%" />
            <col width="8%" />
            <col width="21%" />
            <col width="5%" />
            <col width="24%" />
          </colgroup>

          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Peers</TableCell>
              <TableCell align="center">Speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{torrents}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default observer(TorrentTable);
