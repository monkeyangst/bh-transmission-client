import { observable} from 'mobx';

class TorrentStore {
  @observable torrents=[];
}

var store = new TorrentStore();

export default store;