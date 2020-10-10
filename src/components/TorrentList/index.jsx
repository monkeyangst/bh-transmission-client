import React from 'react';
import {Container} from 'react-bootstrap';
import TorrentCard from './TorrentCard';
import 'bootstrap/dist/css/bootstrap.min.css';

class Torrents extends React.Component {
  state = {
    responseToPost: 'Nothing yet.',
    clientID: 'dgwegoiuwehoiweho',
    torrents: [],
    selectedTorrent: 0
  }

  componentDidMount() {
    this.handleSubmit();
    setInterval(() => {
      this.handleSubmit();
    }, 5000)
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }
  
  
  handleSubmit = async (method, torrentIds) => {
    console.log('Pinging server');
    let data = {
      "arguments": {
        "fields": ['id', 'addedDate', 'name', 'totalSize', 'error', 'errorString', 'eta', 'isFinished', 'isStalled', 'leftUntilDone', 'metadataPercentComplete', 'peersConnected', 'peersGettingFromUs', 'peersSendingToUs', 'percentDone', 'queuePosition', 'rateDownload', 'rateUpload', 'recheckProgress', 'seedRatioMode', 'seedRatioLimit', 'sizeWhenDone', 'status', 'trackers', 'downloadDir', 'uploadedEver', 'uploadRatio', 'webseedsSendingToUs', 'activityDate', 'corruptEver', 'desiredAvailable', 'downloadedEver', 'fileStats', 'haveUnchecked', 'haveValid', 'peers', 'startDate', 'trackerStats', 'comment', 'creator', 'dateCreated', 'files', 'hashString', 'isPrivate', 'pieceCount', 'pieceSize']
         },
      "method": method ? method : 'torrent-get'
    }
    if (torrentIds) data.arguments.ids = torrentIds;

    let bodyText = JSON.stringify(data);

    let headers = {
      'Content-Type': 'application/json',
      'X-Transmission-Session-Id': this.state.clientID
    }

    await fetch('/transmission/rpc', {
      method: 'POST',
      headers: headers,
      body: bodyText,
    })
    .then(response => {
      if (response.status === 409) {
        // Must make second POST request, populating the 'X-Transmission-Session-Id' header with the one returned the first time.
        const newID = response.headers.get('X-Transmission-Session-Id');
        this.setState({clientID: newID})
        fetch('/transmission/rpc', {
          method: 'POST',
          headers: {...headers,'X-Transmission-Session-Id': newID},
          body: bodyText
        }).then(response => {
          response.json().then((result) => {
            if (result.arguments.torrents) this.setState({torrents: result.arguments.torrents})
          })
        });
      }
      else {
        response.json().then((result) => {
          if (result.arguments.torrents) this.setState({torrents: result.arguments.torrents})
        });
      }
    });
  }

  handlePauseResume = (e, torrent) => {

    console.log('I think this is ' + torrent.name);
    let method = 'torrent-stop';
    if (torrent.status === 0) method = 'torrent-start'
    console.log(method);
    this.handleSubmit(method,[torrent.id])
  }



  render() {
    let torrents = this.state.torrents.map((torrent) => {
      let selected = (torrent.id === this.state.selected) ? 1 : 0;
      return <TorrentCard key={torrent.id} torrent={torrent} selected={selected} pause={this.handlePauseResume}/>
    });

    return (
      <Container className="p-3">
        <Container className="mt-3">
          {torrents}
        </Container>
      </Container>
    );
  }
}
export default Torrents;