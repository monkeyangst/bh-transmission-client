import { computed, extendObservable } from 'mobx';

class Torrent {
  // All the possible torrent status codes. Lifted shamelessly from secretmapper/combustion
  static STATUS_STOPPED = 0;
  static STATUS_CHECK_WAIT = 1;
  static STATUS_CHECK = 2;
  static STATUS_DOWNLOAD_WAIT = 3;
  static STATUS_DOWNLOAD = 4;
  static STATUS_SEED_WAIT = 5;
  static STATUS_SEED = 6;

  static ERR_NONE = 0;
  static ERR_TRACKER_WARNING = 1;
  static ERR_TRACKER_ERROR = 2;
  static ERR_LOCAL_ERROR = 3;

  constructor(torrent) {
    extendObservable(this, { ...torrent });
  }

  update(torrent) {
    extendObservable(this, torrent);
  }

  get isSeeding() {
    return this.status === Torrent.STATUS_SEED;
  }

  get isStopped() {
    return this.status === Torrent.STATUS_STOPPED;
  }

  get isChecking() {
    return this.status === Torrent.STATUS_CHECK;
  }

  get isDownloading() {
    return this.status === Torrent.STATUS_DOWNLOAD;
  }

  get isSeedingQueued() {
    return this.status === Torrent.STATUS_SEED_WAIT;
  }

  get isDownloadingQueued() {
    return this.status === Torrent.STATUS_DOWNLOAD_WAIT;
  }

  get isQueued() {
    return this.isDownloadingQueued || this.isSeedingQueued;
  }

  get isDone() {
    return this.leftUntilDone < 1;
  }

  get needsMetaData() {
    return this.metadataPercentComplete < 1;
  }
}

export default Torrent;
