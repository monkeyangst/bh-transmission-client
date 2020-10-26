import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';
import TorrentRow from '../TorrentRow';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(),
    boxSizing: 'border-box',
  },
});

class TorrentTable extends React.Component {
  static contextType = StoreContext;
  torrentStore = this.context.torrentStore;
  viewStore = this.context.viewStore;

  state = {
    loading: true,
    // contextAnchor: {
    //   torrent: null,
    //   anchorEl: null,
    //   posX: null,
    //   posY
    // }
  };

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
    if (this.viewStore.selectedTorrents.length === 0) return false;
    if (this.viewStore.selectedTorrents.indexOf(id) !== -1) return true;
    return false;
  }

  render() {
    // console.log(this.props);
    let torrents = this.props.torrents.map((torrent) => {
      const selected = this.isSelected(torrent.id);
      return (
        <TorrentRow
          key={torrent.id}
          torrent={torrent}
          clicked={(e) => this.viewStore.toggleSelected(torrent.id)}
          pauseButton={(e) =>
            this.startStopClicked(e, torrent.id, torrent.status)
          }
          isSelected={selected}
        />
      );
    });

    var contextAnchor = this.viewStore.contextAnchor;
    if (contextAnchor === null)
      contextAnchor = {
        torrent: null,
        posX: 0,
        posY: 0,
        anchorEl: null,
      };

    return (
      <TableContainer className={this.props.classes.root}>
        <Table style={{ tableLayout: 'fixed', fontSize: '.8em' }}>
          <colgroup>
            <col width="5%" />
            <col width="42%" />
            <col width="8%" />
            <col width="45%" />
          </colgroup>

          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{torrents}</TableBody>
        </Table>
        {/* <ContextMenu
          open={contextAnchor.anchorEl !== null}
          closeMe={() => this.viewStore.removeContextAnchor()}
          torrent={contextAnchor.torrent}
          posX={contextAnchor.posX}
          posY={contextAnchor.posY}
          anchorEl={contextAnchor.anchorEl}
        /> */}
      </TableContainer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(observer(TorrentTable));
