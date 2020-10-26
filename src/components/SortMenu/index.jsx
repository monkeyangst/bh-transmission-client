import { makeStyles, withTheme } from '@material-ui/core';
import { observer } from 'mobx-react';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core/';
import React, { useContext } from 'react';
import { StoreContext } from '../../stores';

const useStyle = makeStyles((theme) => ({
  root: {
    margin: 0,
    flexGrow: 1,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SortMenu = (props) => {
  const { theme } = props;
  const classes = useStyle(theme);
  const { viewStore } = useContext(StoreContext);

  const sortOptions = [
    'Name',
    'Age',
    'Queue Order',
    'Activity',
    'Size',
    'Progress',
    'Ratio',
    'State',
  ];

  const handleChange = (event) => {
    viewStore.setSortBy(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="sort-menu-label">Sort by</InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        labelId="sort-menu"
        id="sort-menu-select-helper"
        value={viewStore.sortBy}
        onChange={handleChange}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default withTheme(observer(SortMenu));
