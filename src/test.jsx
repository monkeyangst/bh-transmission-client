import { observer } from 'mobx-react';
import React from 'react';

class Flooble extends React.Component {
  componentDidMount() {
    this.props.store.fetchTorrents();
  }

  render() {
    return (
      <div>
        <h1>{this.props.store.catchPhrase}</h1>
        <button onClick={() => this.props.store.fetchTorrents()}>HIT ME</button>
        <ul>
          {this.props.store.torrents.map((torrent) => (
            <li key={torrent.id}>{torrent.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default observer(Flooble);
