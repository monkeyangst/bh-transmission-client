import { runInAction, observable, action } from 'mobx';
import RPC from '../util/rpc';

const rpc = new RPC();

class TorrentStore {
  @observable torrents = [];
  @observable loading = true;

  @action async fetchTorrents() {
    this.torrents = [];
    this.loading = true;
    const res = await rpc.sendRequest('torrent-get');
    runInAction(() => {
      this.torrents = res.torrents;
    });
  }
}

// export function createTorrentStore() {
//   return {
//     torrents: [],
//     fetchTorrents() {
//       console.log('Fetching torrents...');
//       rpc.sendRequest('torrent-get').then((response) => {
//         console.log('RESPONSE');
//         console.log(response);
//       });
//     },
//   };
// }

// const TorrentContext = React.createContext(null);

// export const StoreProvider = ({ children }) => {
//   const store = createTorrentStore(TorrentContext);

//   return (
//     <TorrentContext.Provider value={store}>{children}</TorrentContext.Provider>
//   );
// };

// export const useTorrentStore = () => React.useContext(TorrentContext);
