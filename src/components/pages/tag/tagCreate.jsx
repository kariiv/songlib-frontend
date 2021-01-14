import React, {useState} from 'react';

import {Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import TagProvider from "../../../assets/app/provider/TagProvider";
import Tag from "../../../assets/app/object/Tag";

export default ({player}) => {
    const [tag, setTag] = useState('')

    return (
            <Card>
                <Card.Header className='py-3'>
                    <h6 className="m-0 font-weight-bold text-primary">Create new tag</h6>
                </Card.Header>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="New tag..."
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-success" onClick={async (e) => {
                                e.preventDefault()
                                const res = await TagProvider.create(new Tag({name:tag}))
                                if (res !== null) player.init()
                            }}>Create</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card.Body>
            </Card>
    )
}