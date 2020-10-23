import { makeObservable, observable, runInAction } from 'mobx';
import RPC from '../util/rpc';

const rpc = new RPC();

class StatsStore {
  torrentCount = 0;
  activeTorrentCount = 0;
  pausedTorrentCount = 0;
  downloadSpeed = 0;
  uploadSpeed = 0;

  constructor() {
    makeObservable(this, {
      torrentCount: observable,
      activeTorrentCount: observable,
      pausedTorrentCount: observable,
      downloadSpeed: observable,
      uploadSpeed: observable,
    });
  }

  fetchStats() {
    rpc
      .sendRequest('session-stats')
      .then((result) => result.json())
      .then((data) => {
        runInAction(() => {
          // console.log(data.arguments);
          this.uploadSpeed = data.arguments.uploadSpeed;
          this.downloadSpeed = data.arguments.downloadSpeed;
          this.torrentCount = data.arguments.torrentCount;
          this.pausedTorrentCount = data.arguments.pausedTorrentCount;
          this.activeTorrentCount = data.arguments.activeTorrentCount;
        });
      });
  }

  changeDownloadSpeed(newSpeed) {
    this.downloadSpeed = newSpeed;
  }
}

export default new StatsStore();
