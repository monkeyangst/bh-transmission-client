class RPC {
  static SESSION_ID_HEADER = 'X-Transmission-Session-Id';

  constructor() {
    this.sessionID = 'FLOOBLE';
  }

  handleSubmit = (method, torrentIds) => {
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
      'X-Transmission-Session-Id': this.sessionID
    }
    return fetch('/transmission/rpc', {
      method: 'POST',
      headers: headers,
      body: bodyText,
    })
    .then(response => {
      if (response.status === 409) {
        // Must make second POST request, populating the 'X-Transmission-Session-Id' header with the one returned the first time.
        this.sessionID = response.headers.get('X-Transmission-Session-Id');
        return fetch('/transmission/rpc', {
          method: 'POST',
          headers: {...headers,'X-Transmission-Session-Id': this.sessionID},
          body: bodyText
        })
      } else { return response }
      // else {
      //   response.json().then((result) => {
      //     if (result.arguments.torrents) this.setState({torrents: result.arguments.torrents})
      //   });
      // }
    })
  }
}

export default RPC;