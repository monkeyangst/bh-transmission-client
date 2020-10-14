import { runInAction, observable, makeObservable, action } from 'mobx';
import RPC from '../util/rpc';

const rpc = new RPC();

class TorrentStore {
  torrents = [];
  populated = false;

  constructor() {
    makeObservable(this, {
      torrents: observable,
      populated: observable,
      stopTorrent: action,
    });
  }

  fetchTorrents() {
    this.loading = true;
    // console.log('Fetching torrents...');
    rpc
      .sendRequest('torrent-get')
      .then((response) => response.json())
      .then((data) => {
        runInAction(() => {
          // console.log(data.arguments);
          this.torrents = data.arguments.torrents;
          if (this.torrents.length > 0) {
            this.populated = true;
            // console.log('I found some torrents');
            // console.log(this.populated);
          }
        });
      });
  }

  stopTorrent(e = '', ids) {
    let idKeys = [];
    if (!Array.isArray(ids)) idKeys.push(ids);
    else idKeys = ids;
    let args = { ids: [...idKeys] };
    rpc
      .sendRequest('torrent-stop', args)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log('Sould have stopped.');
      });
  }

  startTorrent(e = '', ids) {
    let idKeys = [];
    if (!Array.isArray(ids)) idKeys.push(ids);
    else idKeys = ids;
    let args = { ids: [...idKeys] };
    rpc
      .sendRequest('torrent-start', args)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('Sould have started.');
      });
  }

  changePhrase = () => {
    console.log("I'm changing the phrase");
    this.catchPhrase = 'Something random.';
  };
}

export default new TorrentStore();
