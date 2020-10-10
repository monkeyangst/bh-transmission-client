import React from 'react';
import { Card, ProgressBar, Row, Col } from 'react-bootstrap';
import StatusButton from './StatusButton';

function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}


const TorrentCard = (props) => {
  let percentDone = (props.torrent.percentDone*100).toFixed(2);
  let variant = '';
  let animated = 0;
  let striped = 0;
  let bgColor = '';
  let label = '';
  switch(props.torrent.status) {
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
      variant = 'success'
      animated = 0;
      striped = 0;
      break;
    case 4:
    default:
      animated = 0;
      striped = 0;
      break;
  }
  if (props.torrent.isStalled) {
    if (props.torrent.status === 6) variant = 'success';
    if (props.torrent.status === 4) variant = '';
    striped = 0;
    animated = 1;
  }
  if (props.torrent.error && props.torrent.status !== 0) {
    bgColor = "bg-danger";
  }
  if (props.torrent.recheckProgress > 0) {
    variant = "warning"
    animated = 1;
    percentDone = (props.torrent.recheckProgress*100).toFixed(2);
    label = "Checking local data";

  }
  return (
    <Card key={props.torrent.id} style={{ width: '100%' }} className="mb-3">
      <Card.Body>
          <div className="small" style={{color: 'Red'}}>{props.torrent.errorString}</div>
          <Row>
            <Col className="col-10">
            <Card.Title>{props.torrent.name}</Card.Title>

              <ProgressBar now={percentDone} className={bgColor} variant={variant} animated={animated} striped={striped} label={label} />
              <div>
                {percentDone}% of {formatBytes(props.torrent.totalSize)} downloaded.
              </div>
            </Col>
            <Col className="col-2">
              <StatusButton click={(e) => props.pause(e, props.torrent)} status={props.torrent.status} />
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
              </div>

            </Col>
          </Row>
       </Card.Body>
    </Card>
  )
}
export default TorrentCard;