import React from 'react';

import {Row, Card, Col } from 'react-bootstrap';

export default ({player}) => {
    return (
        <React.Fragment>
            <h1 className="h3 mb-4 text-gray-800">Tag manager</h1>

            <Row>
                <Col lg={6}>
                    <Card>
                        <Card.Header className='py-3'>
                            <h6 className="m-0 font-weight-bold text-primary">Current tags</h6>
                        </Card.Header>

                        <Row className='m-2'>
                            {Object.keys(player.tags).map(k =>
                                <Col key={k} xs={6} sm={6} md={6} xl={4} className='mb-2'>
                                    <Card className='py-3 border-left-success'>
                                        <h5 className='ml-2 mb-0'>{player.tags[k]}</h5>
                                    </Card>
                                </Col>)}
                        </Row>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header className='py-3'>
                            <h6 className="m-0 font-weight-bold text-primary">Create new tag</h6>
                        </Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>

    )
}