import React, {useState} from 'react';

import {Card, Row, Col, FormControl} from 'react-bootstrap';

export default ({songs, onSelect, removed}) => {
    const [search, setSearch] = useState('')

    const filteredSongs = search ? songs.filter(song => (song.title + ' ' + song.artist).toLowerCase().includes(search.toLowerCase())) : songs
    const filteredRemoved = search ? removed.filter(song => (song.title + ' ' + song.artist).toLowerCase().includes(search.toLowerCase())) : removed

    return (
            <Card>
                <Card.Header className='py-3'>
                    <h6 className="m-0 font-weight-bold text-primary">
                        Available Songs
                        <FormControl value={search} type="text" placeholder='Search...' onChange={(e) => setSearch(e.target.value)}/>
                    </h6>
                </Card.Header>

                <Row className='m-2'>
                    {filteredRemoved.map(song => <TagSong key={song.getId()} onSelect={() => onSelect(song)} color="warning" song={song}/>)}
                    {filteredSongs.map(song =><TagSong key={song.getId()} onSelect={() => onSelect(song)} color="danger" song={song}/>)}
                </Row>
            </Card>
    )
}

export const TagSong = ({song, onSelect, color = "primary"}) => {
    return (<Col xs={12} sm={6} md={6} lg={4} xl={3} className='mb-2'>
        <Card className={'py-2 mouse-shadow border-left-' + color } onClick={onSelect}>
            <h5 className='ml-2 mb-0'>{song.title}</h5>
            <h6 className='ml-2 mb-0'>- {song.artist}</h6>
        </Card>
    </Col>)
}