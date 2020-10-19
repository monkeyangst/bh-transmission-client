import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import TorrentProgress from '../TorrentCard/TorrentProgress';
import { formatBytes } from '../../util/calc';

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

  render() {
    this.torrentStore = this.context.torrentStore;
    // console.log('POPULATED? ', this.torrentStore.populated);
    let torrents = [];
    if (this.torrentStore.populated) {
      torrents = this.torrentStore.torrents.map((torrent) => {
        // let selected = torrent.id === this.state.selected ? 1 : 0;
        return (
          <TableRow key={torrent.id}>
            <TableCell>{torrent.queuePosition}</TableCell>
            <TableCell>{torrent.name}</TableCell>
            <TableCell>{formatBytes(torrent.sizeWhenDone)}</TableCell>
            <TableCell>
              <TorrentProgress torrent={torrent} />
            </TableCell>
            <TableCell>{torrent.peersConnected}</TableCell>
            <TableCell>{formatBytes(torrent.rateDownload)}/s</TableCell>
            <TableCell>{formatBytes(torrent.rateUpload)}/s</TableCell>
          </TableRow>
        );
      });
    }

    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Peers</TableCell>
              <TableCell>Down Speed</TableCell>
              <TableCell>Up Speed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{torrents}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default observer(TorrentTable);
