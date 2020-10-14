import { runInAction, observable, makeObservable } from 'mobx';
import RPC from '../util/rpc';

const rpc = new RPC();

class TorrentStore {
  torrents = [];
  populated = false;

  constructor() {
    makeObservable(this, {
      torrents: observable,
      populated: observable,
    });
  }

  fetchTorrents() {
    this.loading = true;
    console.log('Fetching torrents...');
    rpc
      .sendRequest('torrent-get')
      .then((response) => response.json())
      .then((data) => {
        runInAction(() => {
          console.log(data.arguments);
          this.torrents = data.arguments.torrents;
          if (this.torrents.length > 0) {
            this.populated = true;
            console.log('I found some torrents');
            console.log(this.populated);
          }
        });
      });
  }

  changePhrase = () => {
    console.log("I'm changing the phrase");
    this.catchPhrase = 'Something random.';
  };
}

export default new TorrentStore();
