import React, {Component} from "react";
import {Col, Row,Form } from "react-bootstrap";
import Select from 'react-select';

import LANGUAGES_DICT, { LANGUAGES_SELECT } from "../../../assets/app/langs";

import SongProvider from '../../../assets/app/provider/SongProvider'
import { getUGData } from '../../../actions/ug'

import history from "../../../history";
import Rating from 'react-rating'
import { rankRange } from "../../../assets/app/playlist/PlaylistStrategy";

import {EditToolbar, NavToolbar} from "./toolbar";
import Song from "../../../assets/app/object/Song";


export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state["song"] = this.props.data ? new Song(this.props.data.s) : new Song({})
        if (!this.state.song.lyrics) this.state.song.lyrics = "Lyrics..."
        this.state['artistList'] = false;
    }

    dataFromUltimateGuitar = () => {
        getUGData((data) => {
            const { artist, lyrics, title } = data
            const { song } = this.state
            song.lyrics = lyrics
            song.artist = artist
            song.title = title
            this.setState({song})
        })
    }

    handleSave = async () => {
        const res = await this.state.song.save()

        if (res && (res.data || res.info)) {
            await this.props.player.init()
            const id = this.state.song.id || res.data
            if (id) history.push('/play/?s=' + id)
        }
    }
    
    handleExitEdit = () => {
        const {data, player} = this.props;
        data ? player.setSong(data.s) : history.push('/');
    }
    
    handleDelete = async () => {
        await SongProvider.delete(this.props.data.s.id)
        this.props.player.init()
    }

    handleArtistListShow = () => {
        this.setState({artistList: true})
    }
    handleArtistListHide = () => {
        this.setState({artistList: false})
    }

    handleTitle = (e) => {
        const {song} = this.state
        song.title = e.target.value
        this.setState({song})
    }
    handleArtist = (e) => {
        const {song} = this.state
        song.artist = e.target.value
        this.setState({song})
    }
    handleLink = (e) => {
        const {song} = this.state
        song.link = e.target.value
        this.setState({song})
    }
    handleTag = (v) => {
        const {song} = this.state

        if (!v) song.tags = []
        else song.tags = v.map(t => t.value)
        this.setState({song})
    }
    handleRating = (e) => {
        const {song} = this.state
        song.rank = e
        this.setState({song})
    }
    handleLang = (v) => {
        const {song} = this.state
        song.lang = v ? v.value : ''
        this.setState({song})
    }
    handleLyrics = (e) => {
        const {song} = this.state
        song.lyrics = e.target.value
        this.setState({song})
    }



    render() {
        const {data, player, controller} = this.props;

        const {artistList, song} = this.state
        const { rank, lyrics, title, artist, link, lang, tags} = song;
        
        const {handlePrev, handleNext, handleRand} = data ? controller:{};

        const split = lyrics.split('\n');
        const rows = split.length;
        const cols = Math.max.apply(null, split.map(l => l.length))
        
        const {p, s} = data? data : {};
        
        const navText = data ? {
            now: s.index,
            total: p.songs.length,
            level: s.getTransposition()
        } : {};

        return (
            <React.Fragment>
                {!!data && <h5>Edit <i className='fas fa-angle-right'/> {data.p.name}
                <i className='fas fa-angle-right'/> {data.s.title}</h5>}
                {!data && <h5>New song</h5>}
                {!data && <span className="btn btn-warning btn-icon-split" onClick={this.dataFromUltimateGuitar}>
                    <span className="icon text-white-50">
                      <i className="fas fa-cloud-download-alt"/>
                    </span>
                    <span className="text">Ultimate Guitar</span>
                </span> }
                {data && <NavToolbar prev={handlePrev} rand={handleRand} next={handleNext} up={() => {}} down={() => {}} text={navText}/>}

                <Row>
                    <Col xs={12} sm={8} md={6} lg={4} className='mb-3'>
                        <Form.Group className='mb-1'>
                            <Form.Control
                                className='edit-form'
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={this.handleTitle}
                            />

                            <Form.Control
                                className='edit-form'
                                type="text"
                                placeholder="Artist"
                                value={artist}
                                onFocus={this.handleArtistListShow}
                                onBlur={this.handleArtistListHide}
                                onChange={this.handleArtist}
                            />
                            {artistList && 'List'}
                            <Form.Control
                                className='edit-form'
                                type="text"
                                placeholder="Link"
                                value={link}
                                onChange={this.handleLink}
                            />
                        </Form.Group>

                        <div style={{color:'black'}} className="mb-1">
                            <Select
                                isClearable={true}
                                closeMenuOnSelect={true}
                                placeholder='Language...'
                                options={LANGUAGES_SELECT}
                                value={ (() => lang ? { value:lang, label: LANGUAGES_DICT[lang].label} : null)() }
                                onChange={this.handleLang}
                            />
                        </div>

                        <div style={{color:'black'}}>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                placeholder='Tags...'
                                options={Object.values(player.tags).map(tag => { return {value: tag.getId(), label: tag.getName()}}) }
                                value={tags.map(t => { return {value: t, label: player.tags[t].getName()}})}
                                onChange={this.handleTag}
                            />
                        </div>

                        <Rating
                            start={-1} stop={4}
                            initialRating={rank}
                            onChange={this.handleRating}
                            emptySymbol="fas fa-fw fa-star text-gray-300"
                            fullSymbol={['danger','warning','primary','info','success'].map(c=> "fas fa-fw fa-star text-"+c)}
                        /> { rankRange[rank] }
                    </Col>
                </Row>

                <textarea
                    wrap='off'
                    className='lyrics edit-textarea'
                    cols={cols - 1}
                    rows={rows}
                    value={lyrics}
                    onChange={this.handleLyrics}
                />

                <EditToolbar onLeave={this.handleExitEdit} onDelete={data?this.handleDelete:''} onSave={this.handleSave} />
                
            </React.Fragment>
        )
    }
}



