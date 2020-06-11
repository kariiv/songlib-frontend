import React, {useState} from 'react';

import {Row, Card, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

export default ({player}) => {
    const [tag, setTag] = useState('')
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
                                <Col key={k} xs={12} sm={6} md={6} className='mb-2'>
                                    <Card className='py-3 border-left-success'>
                                        <h5 className='ml-2 mb-0'>{player.tags[k]}
                                            <i className="fa fa-trash icon-trash-hover text-gray-200 float-right mr-3" onClick={() => {
                                                console.log('Wanna delete?' + k )
                                            }}/>
                                        </h5>
                                    </Card>
                                </Col>)}
                        </Row>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <Card.Header className='py-3'>
                            <h6 className="m-0 font-weight-bold text-primary">Create new tag
                            </h6>
                        </Card.Header>
                        <Card.Body>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="New tag..."
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary">Button</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>

    )
}