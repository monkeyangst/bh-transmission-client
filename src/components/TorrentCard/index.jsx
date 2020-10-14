import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import StatusButton from './StatusButton';
import TorrentProgress from './TorrentProgress';
import TorrentStats from './TorrentStats';
import { formatBytes } from '../../util/calc';

const TorrentCard = (props) => {
  return (
    <Card key={props.torrent.id} style={{ width: '100%' }} className="mb-3">
      <Card.Body>
        <div className="small" style={{ color: 'Red' }}>
          {props.torrent.errorString}
        </div>
        <Row>
          <Col className="col-10">
            <Card.Title>{props.torrent.name}</Card.Title>
            <Row>
              <Col className="col-11">
                <TorrentProgress torrent={props.torrent} />
              </Col>
              <Col className="col-1">
                <StatusButton
                  click={(e) => props.pause(e, props.torrent)}
                  status={props.torrent.status}
                />
              </Col>
            </Row>

            <div className="small">
              {props.torrent.percentDone * 100}% of{' '}
              {formatBytes(props.torrent.totalSize)} downloaded.
            </div>
          </Col>
          <Col className="col-2">
            <TorrentStats torrent={props.torrent} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default TorrentCard;
