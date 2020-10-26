import { makeStyles, withTheme } from '@material-ui/core';
import { observer } from 'mobx-react';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core/';
import React, { useContext } from 'react';
import { StoreContext } from '../../stores';
import { FilterStates as filterStates } from '../../stores/prefsStore';

const useStyle = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const handleChange = () => {
  return false;
};
const SortMenu = (props) => {
  const { theme } = props;
  const classes = useStyle(theme);
  const { viewStore } = useContext(StoreContext);

  const handleChange = (event) => {
    viewStore.setFilterBy(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="filter-menu-label">Filter</InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        labelId="filter-menu"
        id="filter-menu-select-helper"
        value={viewStore.filterBy}
        onChange={handleChange}
      >
        {filterStates.map((criteria) => (
          <MenuItem key={criteria.value} value={criteria.value}>
            {criteria.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default withTheme(observer(SortMenu));
