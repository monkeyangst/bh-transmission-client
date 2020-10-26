import { runInAction, observable, makeObservable, action } from 'mobx';
import RPC from '../util/rpc';
import Torrent from './torrent';

const rpc = new RPC();

class TorrentStore {
  torrents = [];
  selectedTorrents = [];
  populated = false;

  criteriaList = {
    queue_order: 'Queue Order',
    activity: 'Activity',
    age: 'Age',
    name: 'Name',
    percent_completed: 'Progress',
    ratio: 'Ratio',
    size: 'Size',
    state: 'State',
  };

  constructor() {
    makeObservable(this, {
      torrents: observable,
      populated: observable,
      stopTorrent: action,
    });
  }

  fetchTorrents() {
    const args = {
      fields: [
        'id',
        'addedDate',
        'name',
        'totalSize',
        'error',
        'errorString',
        'eta',
        'isFinished',
        'isStalled',
        'leftUntilDone',
        'metadataPercentComplete',
        'peersConnected',
        'peersGettingFromUs',
        'peersSendingToUs',
        'percentDone',
        'queuePosition',
        'rateDownload',
        'rateUpload',
        'recheckProgress',
        'seedRatioMode',
        'seedRatioLimit',
        'sizeWhenDone',
        'status',
        'trackers',
        'downloadDir',
        'uploadedEver',
        'uploadRatio',
        'webseedsSendingToUs',

        'activityDate',
        'corruptEver',
        'desiredAvailable',
        'downloadedEver',
        'fileStats',
        'haveUnchecked',
        'haveValid',
        'peers',
        'startDate',
        'trackerStats',
        'comment',
        'creator',
        'dateCreated',
        'files',
        'hashString',
        'isPrivate',
        'pieceCount',
        'pieceSize',
        'labels',
      ],
    };

    this.loading = true;
    // console.log('Fetching torrents...');
    rpc
      .sendRequest('torrent-get', args)
      .then((response) => response.json())
      .then((data) => {
        runInAction(() => {
          // console.log(data.arguments);
          const newTorrents = data.arguments.torrents;
          if (newTorrents.length > 0) {
            this.populated = true;
            // right now we don't pass IDs to this method, so we just replace everything
            this.torrents.replace(
              newTorrents.map((torrent) => new Torrent(torrent))
            );
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

  getTorrent = (id) =>
    this.torrents.find((torrent, index) => {
      if (torrent.id === id) return true;
      else return false;
    });
}

export default new TorrentStore();
