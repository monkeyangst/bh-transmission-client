import React from 'react';
import { GiSnail, GiRabbit } from 'react-icons/gi';
import Switch from '@material-ui/core/Switch';
import { makeStyles, withTheme } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    height: '1.5em',
    width: '1.5em',
  },
}));

const SpeedSwitch = (props) => {
  const theme = props.theme;
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <GiRabbit className={classes.icon} />
      <Switch />
      <GiSnail className={classes.icon} />
    </div>
  );
};
export default withTheme(SpeedSwitch);
