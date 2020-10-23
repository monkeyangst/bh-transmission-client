import React from 'react';
import { Typography, TableRow, TableCell, Tooltip } from '@material-ui/core';
import TorrentProgress from '../TorrentProgress';
import { formatBytes } from '../../util/calc';
import { observer } from 'mobx-react';
import StatusButton from '../StatusButton';
import TorrentLabels from '../TorrentLabels';

const TorrentRow = (props) => {
  const { torrent, clicked, isSelected, pauseButton } = props;
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
        <Tooltip title={torrent.name} enterDelay={1500} enterNextDelay={1000}>
          <Typography noWrap>{torrent.name}</Typography>
        </Tooltip>
        <TorrentLabels torrent={torrent} />
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
