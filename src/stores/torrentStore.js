import { runInAction, observable, makeObservable, action } from 'mobx';
import RPC from '../util/rpc';

const rpc = new RPC();

class TorrentStore {
  torrents = [];
  selectedTorrents = [];
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

  stopOrStart = (doWhich = 'torrent-start', selectedIds) => {
    let idKeys = [];
    // If we've only got one torrent, not an array, that's fine
    if (Array.isArray(selectedIds)) idKeys = selectedIds;
    else idKeys.push(selectedIds);
    // by this time, idKeys should be an array of ids
    let args = { ids: [...idKeys] };
    rpc
      .sendRequest(doWhich, args)
      .then((response) => response.json())
      .then((data) => {
        // Set the status of each of our selected torrents to 0: stopped
        if (data.result === 'success') {
          console.log('SENDING STOP REQUEST SUCCESSFUL');
          runInAction(() => {
            for (var torrent of this.torrents) {
              if (idKeys.includes(torrent.id)) {
                console.log(torrent.name + ' is what you clicked.');
                if (doWhich === 'torrent-stop') {
                  torrent.status = 0;
                  torrent.name = 'Pausing...';
                } else {
                  torrent.status = 4;
                  torrent.name = 'Starting...';
                }
              }
            }
          });
        }
      });
  };

  stopTorrent = (e = '', ids) => {
    this.stopOrStart('torrent-stop', ids);
  };

  startTorrent = (e = '', ids) => {
    this.stopOrStart('torrent-start', ids);
  };

  changePhrase = () => {
    console.log("I'm changing the phrase");
    this.catchPhrase = 'Something random.';
  };
}

export default new TorrentStore();
