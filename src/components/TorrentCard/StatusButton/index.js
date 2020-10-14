import React from 'react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import classes from './StatusButton.module.css';

const StatusButton = (props) => {
  let buttonIcon = props.status === 0 ? <FaPlayCircle /> : <FaPauseCircle />;
  return (
    <span className={classes.StatusButton} onClick={props.click}>
      {buttonIcon}
    </span>
  );
};
export default StatusButton;
