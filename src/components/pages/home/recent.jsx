import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";

export default ({player}) => {

    const history = JSON.parse(localStorage.getItem('_h')) || []

    return (
        <Card className='mb-3'>
            <Card.Header>
                <h3 className="mb-0 text-gray-800">
                    <i className="fas fa-music text-gray-300"/> Recent
                </h3>
            </Card.Header>
            <Card.Body className='recent-list pb-0'>
                <Row>
                    { history.map(id => {
                        const song = player.getSongById(id);

                        return (<Col key={id} xs={12}  sm={6} lg={4} xl={3} className="mb-4">
                            <Card className={"shadow h-100 py-2 border-left-danger"} >
                                <Card.Body className='p-0'>
                                    <i className="fas fa-times icon-trash-hover text-gray-200 float-right mr-3" onClick={() => {
                                        player.deleteFromHistory(id);
                                        player.refreshComponent();
                                    }}/>
                                    <Row className="no-gutters align-items-center pl-3 pb-3 pt-3" style={{cursor:'pointer'}} onClick={() => player.setSongAll(song.id)}>
                                        <Col className="mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                {song ? song.artist : id}
                                            </div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                {song ? song.title : ''}
                                            </div>
                                        </Col>
                                        <div className="col-auto">
                                            <i className="fas fa-play fa-2x text-gray-300"/>
                                        </div>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>)
                    })}
                    {history.length === 0 && <h4><Link to='/play'>--> Check out all songs now! {'<'}-- </Link></h4>}
                </Row>
            </Card.Body>
        </Card>
    )
};