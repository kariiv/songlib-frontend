import React from 'react';

import {Card, Row, Col} from 'react-bootstrap';
import TagProvider from "../../../assets/app/provider/TagProvider";

let fakeTrigger = true

export default ({onSelect, player}) => {

    return (
        <Card>
            <Card.Header className='py-3'>
                <h6 className="m-0 font-weight-bold text-primary">Current tags</h6>
            </Card.Header>

            <Row className='m-2' style={{minHeight:"70px"}}>
                {Object.values(player.tags).map(tag =>
                    <Col key={tag.getId()} xs={12} sm={6} md={6} className='mb-2'>
                        <Card className='py-3 border-left-success mouse-shadow' onClick={() => {
                            if (fakeTrigger) onSelect(tag)
                            else fakeTrigger = true;
                        }}>
                            <h5 className='ml-2 mb-0'>
                                <span className="badge badge-counter badge-danger tag-list">{tag.getSongs().length}</span>
                                {tag.getName()}
                                <i className="fa fa-trash icon-trash-hover text-gray-200 float-right mr-3" onClick={async () => {
                                    fakeTrigger = false
                                    const res = await TagProvider.delete(tag.getId())
                                    if (res !== null) player.init()
                                }}/>

                            </h5>

                        </Card>
                    </Col>)}
            </Row>
        </Card>
    )
}