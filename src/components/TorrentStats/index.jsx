import React from 'react';
import { formatBytes } from '../../../util/calc';

const TorrentStats = (props) => {
  return (
    <div className="small mt-2">
      <div>
        <strong>Downloaded:</strong> {formatBytes(props.torrent.downloadedEver)}
      </div>
      <div>
        <strong>Uploaded:</strong> {formatBytes(props.torrent.uploadedEver)}
      </div>
      <div>
        <strong>Rate down:</strong> {formatBytes(props.torrent.rateDownload)}/s
      </div>
      <div>
        <strong>Rate up:</strong> {formatBytes(props.torrent.rateUpload)}/s
      </div>
      <div>
        <strong>Ratio:</strong> {props.torrent.uploadRatio}
      </div>
      <div>
        <strong>Seed Ratio Limit:</strong> {props.torrent.seedRatioLimit}
      </div>
    </div>
  );
};
export default TorrentStats;
