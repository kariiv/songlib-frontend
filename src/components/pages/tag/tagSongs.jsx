import React, {useState} from 'react';

import {Card, Row, FormControl, InputGroup, Button} from 'react-bootstrap';
import TagSongsAvailable, { TagSong } from './tagSongsAvailable';

import TagProvider from "../../../assets/app/provider/TagProvider";


export default ({tag, player, onClose}) => {
    const [addedSongs, setAdded] = useState([])
    const [removedSongs, setRemoved] = useState([])

    const leftoverSongs = tag.getSongs().filter(song => removedSongs.indexOf(song) === -1)
    const tagSongs = leftoverSongs.concat(addedSongs)
    const availableSongs = player.getSongs().filter(song => tagSongs.indexOf(song) === -1).filter(song => removedSongs.indexOf(song) === -1)


    const handleRemoveSong = (song) => {
        if (addedSongs.indexOf(song) !== -1) {
            const add = [...addedSongs]
            add.splice(add.indexOf(song), 1)
            setAdded(add)
        } else {
            const rem = [...removedSongs]
            rem.push(song)
            setRemoved(rem)
        }

    }
    const handleAddSong = (song) => {
        if (removedSongs.indexOf(song) !== -1) {
            const add = [...removedSongs]
            add.splice(add.indexOf(song), 1)
            setRemoved(add)
        } else {
            const add = [...addedSongs]
            add.push(song)
            setAdded(add)
        }
    }
    const handleSaveSongTags = async () => {
        addedSongs.forEach(song => tag.addSong(song))
        removedSongs.forEach(song => tag.removeSong(song))

        const res = await TagProvider.saveSongTags(tag)

        if (res !== null) {
            await player.init()
            setAdded([])
            setRemoved([])
            window.location.href = "tag"
        }
    }

    return (
        <React.Fragment>
            <EditTagName tag={tag} player={player}/>

            <Card className='mb-1'>
                <Card.Header className='py-3'>
                    <h6 className="m-0 font-weight-bold text-primary">Included Songs <i className="fas fa-times icon-trash-hover text-gray-200 float-right mr-3" onClick={onClose}/></h6>
                </Card.Header>
                <Row className='m-2' style={{minHeight:"70px"}}>
                    {leftoverSongs.map(song => <TagSong key={song.getId()} color="success" song={song} onSelect={() => handleRemoveSong(song)} />)}

                    {addedSongs.map(song => <TagSong key={song.getId()} color="warning" song={song} onSelect={() => handleRemoveSong(song)}/>)}
                </Row>
            </Card>

            <TagSongsAvailable onSelect={handleAddSong} songs={availableSongs} removed={removedSongs} />

            {!!(addedSongs.length || removedSongs.length ) && <span className="flying-button text-center mouse-shadow">
                <span className="btn-circle btn-lg btn-success shadow-sm" onClick={handleSaveSongTags}>
                    <i className="fas fa-check fa-sm text-white-50"/>
                </span>
            </span>}
        </React.Fragment>

    )
}

const EditTagName = ({tag, player}) => {
    const [name, setName] = useState(tag.getName())

    const handleChange = async () => {
        if (name === '') return
        tag.setName(name)
        const res = await TagProvider.edit(tag)

        if (res !== null)
            player.init()
    }

    return (
        <InputGroup className='mb-2'>
            <FormControl type="text" value={name} placeholder={"Name..."} onChange={(e) => setName(e.target.value)}/>

            {name !== "" && name !== tag.getName() && <InputGroup.Append>
                <Button variant={'outline-danger'} onClick={() => setName(tag.getName())}><i className='fas fa-redo'/></Button>
                <Button variant={'outline-primary'} className='px-3' onClick={handleChange}><i className='fas fa-paper-plane'/></Button>
            </InputGroup.Append>}
        </InputGroup>
    )
}


