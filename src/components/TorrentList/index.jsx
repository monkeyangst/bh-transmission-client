import React from 'react';
import { Container } from 'react-bootstrap';
import TorrentCard from '../TorrentCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreContext } from '../../stores';
import { observer } from 'mobx-react';

class Torrents extends React.Component {
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
    // console.log('TorrentList: --- render()');
    // console.log(this.context);
    this.torrentStore = this.context.torrentStore;
    // console.log('POPULATED? ', this.torrentStore.populated);
    let torrents = [];
    if (this.torrentStore.populated) {
      torrents = this.torrentStore.torrents.map((torrent) => {
        let selected = torrent.id === this.state.selected ? 1 : 0;
        return (
          <TorrentCard
            key={torrent.id}
            torrent={torrent}
            selected={selected}
            pause={
              torrent.status === 0
                ? this.torrentStore.startTorrent
                : this.torrentStore.stopTorrent
            }
          />
        );
      });
    }
    return (
      <Container className="p-3">
        <Container className="mt-3">{torrents}</Container>
      </Container>
    );
  }
}
export default observer(Torrents);
