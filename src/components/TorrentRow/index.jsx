import React, { useContext } from 'react';
import { Typography, TableRow, TableCell } from '@material-ui/core';
import TorrentProgress from '../TorrentProgress';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { formatBytes } from '../../util/calc';
import { observer } from 'mobx-react';
import StatusButton from '../StatusButton';
import { StoreContext } from '../../stores';
import TorrentLabels from '../TorrentLabels';

const TorrentRow = (props) => {
  const { torrent, clicked, isSelected, pauseButton } = props;
  const { viewStore, torrentStore } = useContext(StoreContext);
  return (
    <TableRow
      key={torrent.id}
      onClick={clicked}
      selected={isSelected}
      hover={true}
    >
      <TableCell>
        <StatusButton click={pauseButton} status={torrent.status} />
      </TableCell>
      <TableCell style={{ overflow: 'hidden' }}>
        <Typography>{torrent.name}</Typography>
        <TorrentLabels labels={torrent.labels} />
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">
          {formatBytes(torrent.sizeWhenDone)}
        </Typography>
      </TableCell>
      <TableCell align="center" style={{ width: '60%' }}>
        <TorrentProgress torrent={torrent} />
      </TableCell>
    </TableRow>
  );
};
export default observer(TorrentRow);
