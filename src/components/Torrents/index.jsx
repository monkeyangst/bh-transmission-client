import React from 'react';
import { observer } from 'mobx-react';
import TorrentTable from '../TorrentTable';

const Torrents = (props) => {
  return <TorrentTable />;
};
export default observer(Torrents);
