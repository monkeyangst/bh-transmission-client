import React from 'react'
import { ProgressBar } from 'react-bootstrap'
import classes from './TorrentProgress.module.css'

const TorrentProgress = (props) => {
  let {torrent} = props;
  let percentDone = (torrent.percentDone*100).toFixed(2);
  let variant = '';
  let animated = 0;
  let striped = 0;
  let bgColor = 'transparent';
  let label = '';
  switch(torrent.status) {
    case 0:
      variant = 'secondary';
      animated = 0;
      striped = 0;
      label = "Paused";
      break;
    case 1: 
      variant = 'warning';
      animated = 1;
      striped = 1;
      break;
    case 2: 
      variant = 'secondary';
      animated = 1;
      striped = 1;
      break;
    case 3: 
      animated = 0;
      striped = 1;
      break;
    case 5: 
      variant = 'success'
      animated = 1;
      striped = 1;
      break;
    case 6: 
      let ratioProgress = props.torrent.uploadRatio / props.torrent.seedRatioLimit;
      if (ratioProgress < 1) {
        percentDone = ratioProgress * 100;
        bgColor = 'success';
        animated = 1;
        striped = 1;
      } else {
        animated = 1;
      }
      variant = 'success'
       break;
    case 4:
    default:
      animated = 0;
      striped = 0;
      break;
  }
  if (torrent.isStalled) {
    if (torrent.status === 6) variant = 'success';
    if (torrent.status === 4) variant = '';
    striped = 0;
    animated = 1;
  }
  if (torrent.error && torrent.status !== 0) {
    bgColor = "danger";
  }
  if (torrent.recheckProgress > 0) {
    variant = "warning"
    animated = 1;
    percentDone = (torrent.recheckProgress*100).toFixed(2);
    label = "Checking local data";

  }
  return (
    <ProgressBar className={classes.TorrentProgress}>
      <ProgressBar now={percentDone} variant={variant} animated={animated} striped={striped} label={label} />
      <ProgressBar now={100-percentDone} variant={bgColor} />
    </ProgressBar>
    )
};
export default TorrentProgress;