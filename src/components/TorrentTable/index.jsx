import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import TorrentRow from '../TorrentRow';

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

  isSelected(id) {
    // console.log('isSelected()');
    // console.log(this.torrentStore.selectedTorrents);
    if (this.torrentStore.selectedTorrents.length === 0) return false;
    if (this.torrentStore.selectedTorrents.indexOf(id) !== -1) return true;
    return false;
  }

  render() {
    this.torrentStore = this.context.torrentStore;
    // console.log('POPULATED? ', this.torrentStore.populated);
    let torrents = [];
    if (this.torrentStore.populated) {
      torrents = this.torrentStore.torrents.map((torrent) => {
        const selected = this.isSelected(torrent.id);
        return (
          <TorrentRow
            key={torrent.id}
            torrent={torrent}
            clicked={(e) => this.torrentStore.toggleSelected(torrent.id)}
            pauseButton={(e) =>
              this.startStopClicked(e, torrent.id, torrent.status)
            }
            isSelected={selected}
          />
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
