import React from 'react';
import { Typography, TableRow, TableCell } from '@material-ui/core';
import TorrentProgress from '../TorrentProgress';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { formatBytes } from '../../util/calc';
import { observer } from 'mobx-react';
import StatusButton from '../StatusButton';

const TorrentRow = (props) => {
  const { torrent, clicked, isSelected, pauseButton } = props;
  // console.log('Selected? ' + isSelected);
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
      <TableCell style={{ overflow: 'hidden' }}>{torrent.name}</TableCell>
      <TableCell align="center">
        <Typography variant="body2">
          {formatBytes(torrent.sizeWhenDone)}
        </Typography>
      </TableCell>
      <TableCell align="center" style={{ width: '60%' }}>
        <TorrentProgress torrent={torrent} />
      </TableCell>
      <TableCell align="center">{torrent.peersConnected}</TableCell>
      <TableCell align="center">
        <Typography
          variant="body2"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowDownward fontSize="small" />
          <span style={{ display: 'block' }}>
            {formatBytes(torrent.rateDownload)}/s
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <ArrowUpward fontSize="small" />
          <span style={{ display: 'block' }}>
            {formatBytes(torrent.rateUpload)}/s
          </span>
        </Typography>
      </TableCell>
    </TableRow>
  );
};
export default observer(TorrentRow);
