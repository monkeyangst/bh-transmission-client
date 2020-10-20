import React from 'react';
import { PlayCircleOutline, PauseCircleOutline } from '@material-ui/icons';
import classes from './StatusButton.module.css';

const StatusButton = (props) => {
  let buttonIcon =
    props.status === 0 ? <PlayCircleOutline /> : <PauseCircleOutline />;
  return (
    <span className={classes.StatusButton} onClick={props.click}>
      {buttonIcon}
    </span>
  );
};
export default StatusButton;
