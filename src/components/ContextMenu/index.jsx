import React from 'react';
import { Menu } from '@material-ui/core';
import { observer } from 'mobx-react';

const ContextMenu = (props) => {
  const { torrent, posX, posY, closeMe } = props;

  // console.log('TOP', posY);
  // console.log('LEFT', posX);

  return (
    <Menu
      keepMounted
      anchorPosition={
        posY !== null && posX !== null ? { top: posY, left: posX } : undefined
      }
      anchorReference="anchorPosition"
      open={posY !== null}
      onClose={closeMe}
    >
      <p>{torrent ? torrent.name : 'no torrent selected'}?</p>
    </Menu>
  );
};
export default observer(ContextMenu);
