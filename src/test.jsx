import { useObserver } from 'mobx-react';
import React from 'react';
import { useTorrentStore } from './stores/torrentStore';

const Flooble = (props) => {
  const torrentStore = useTorrentStore();
  return useObserver(() => (
    <>
      <ul>
        {torrentStore.torrents.map((torrent) => (
          <li key={torrent.id}>{torrent.name}</li>
        ))}
      </ul>
    </>
  ));
};
export default Flooble;
