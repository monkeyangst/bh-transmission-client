import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import StatusButton from './StatusButton';
import TorrentProgress from './TorrentProgress';
import TorrentStats from './TorrentStats';
import { formatBytes } from '../../util/calc';

const TorrentCard = (props) => {
  return (
    <Card key={props.torrent.id} style={{ width: '100%' }} className="mb-3">
      <CardContent>
        <div className="small" style={{ color: 'Red' }}>
          {props.torrent.errorString}
        </div>
        <Row>
          <Col className="col-10">
            <div>{props.torrent.name}</div>
            <Row>
              <Col className="col-11">
                <TorrentProgress torrent={props.torrent} />
              </Col>
              <Col className="col-1">
                <StatusButton
                  click={(e) => props.pause(e, props.torrent.id)}
                  status={props.torrent.status}
                />
              </Col>
            </Row>

            <div className="small">
              {props.torrent.percentDone * 100}% of{' '}
              {formatBytes(props.torrent.totalSize)} downloaded.
            </div>
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};
export default TorrentCard;
