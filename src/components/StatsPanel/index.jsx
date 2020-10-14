import React from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../../stores';
import { Card } from 'react-bootstrap';
import classes from './StatsPanel.module.scss';

class StatsPanel extends React.Component {
  static contextType = StoreContext;

  componentDidMount() {
    console.log('--- componentDidMount()');
    this.statsStore.fetchStats();
    // console.log('I tried featching stats...');
    //   setInterval(() => {
    //     this.statsStore.fetchStats();
    //   }, 5000);
  }

  render() {
    console.log('--- render()');
    console.log(this.context);
    this.statsStore = this.context.statsStore;
    return (
      <Card className={classes.StatsPanel}>
        <ul>
          <li>
            <strong>Download Speed: </strong>
            {this.statsStore.downloadSpeed}
          </li>
          <li>
            <strong>Upload Speed: </strong>
            {this.statsStore.uploadSpeed}
          </li>
          <li>
            <strong>Torrent Count: </strong>
            {this.statsStore.torrentCount}
          </li>
          <li>
            <strong>Active: </strong>
            {this.statsStore.activeTorrentCount}
          </li>
          <li>
            <strong>Paused: </strong>
            {this.statsStore.pausedTorrentCount}
          </li>
        </ul>
      </Card>
    );
  }
}

export default observer(StatsPanel);
