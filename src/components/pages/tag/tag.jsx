import React, {useState} from 'react';

import {Row, Col} from 'react-bootstrap';
import TagCreate from "./tagCreate"
import TagSelect from "./tagSelect"
import TagSongs from "./tagSongs"

export default ({player}) => {
    const [tag, setTag] = useState(null)

    const handleSelect = (v) => {
        if (v === tag) setTag(null)
        else setTag(v)
    }

    return (
        <React.Fragment>
            <h1 className="h3 mb-4 text-gray-800">Tag manager</h1>

            {!tag && <Row>
                <Col lg={6} className='mb-2'>
                    <TagSelect player={player} onSelect={handleSelect}/>
                </Col>

                <Col lg={6}>
                    <TagCreate player={player}/>
                </Col>
            </Row>}

            {tag && <TagSongs player={player} tag={tag} onClose={() => {handleSelect(tag)}}/> }

        </React.Fragment>
    )
}