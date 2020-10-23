import React from 'react';
import { observer } from 'mobx-react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    fontSize: '.5em',
    height: '2em',
  },
}));

const TorrentLabels = (props) => {
  const classes = useStyles();
  const { torrent } = props;
  if (torrent.labels.length === 0) return null;
  const labelElements = torrent.labels.map((label, index) => (
    <Chip
      key={index}
      className={classes.root}
      color="secondary"
      size="small"
      label={label}
    />
  ));
  return <div>{labelElements}</div>;
};
export default observer(TorrentLabels);
