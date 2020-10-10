import React, {Component} from "react";
import {Col, Row,Form } from "react-bootstrap";
import Select from 'react-select';

import { saveSong, deleteSong } from '../../../actions/songs'
import { getUGData } from '../../../actions/ug'

import history from "../../../history";
import Rating from 'react-rating'
import { rankRange } from "../../../assets/app/playlist/PlaylistStrategy";

import {EditToolbar, NavToolbar} from "./toolbar";


export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStates()
        this.state['artistList'] = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!!this.props.data !== !!prevProps.data)
            this.setState(this.getStates())
    }

    getStates() {
        if (this.props.data) {
            const {s} = this.props.data;
            return {title: s.title || '', artist: s.artist || '',
                tags: s.tags || [], lyrics: s.lyrics || 'Lyrics...',
                link: s.link || '',rank: s.rank || 0,
            }
        } else return {title: '', artist: '', tags: [], lyrics:'Lyrics...', link: '',rank: 0,}
    }

    dataFromUltimateGuitar = () => {
        getUGData((data) => {
            const { artist, lyrics, title } = data
            this.setState({artist, title, lyrics})
        })
    }

    handleSave = () => {
        const { title, artist, tags, lyrics, link, rank } = this.state;
        const id = this.props.data ? this.props.data.s.id : '';
        const cb = this.props.data ?
            () => this.props.player.reloadLibrary() :
            (id) => this.props.player.reloadLibrary(() => history.push('/play/?s='+id))

        saveSong({
            id,
            title: title || '',
            artist: artist || '',
            tags: tags.length > 0 ? tags.join(' '):'',
            lyrics: lyrics || '',
            link: link || '',
            rank: rank || 0,
        }, cb)
    }
    
    handleExitEdit = () => {
        const {data, player} = this.props;
        data ? player.setSong(data.s) : history.push('/');
    }
    
    handleDelete = () => { 
        deleteSong(this.props.data.s.id, this.props.player.reloadLibrary);
    }
    
    handleArtistListShow = () => {
        this.setStage({artistList: true})
    }
    handleArtistListHide = () => {
        this.setStage({artistList: false})
    }

    render() {
        const {data, player, controller} = this.props;
        const {artistList, rank, lyrics, title, artist, link, tags} = this.state;
        
        const {handlePrev, handleNext, handleRand} = data ? controller:{};

        const split = lyrics.split('\n');
        const rows = split.length;
        const cols = Math.max.apply(null, split.map(l => l.length))
        
        const {p, s} = data? data : {};
        
        const navText = data ? {
            now: s.index,
            total: p.songs.length,
            level: s.transpose
        } : {};
        
        return (
            <React.Fragment>
                {data && <h5>Edit <i className='fas fa-angle-right'/> {data.p.name} 
                <i className='fas fa-angle-right'/> {data.s.title}</h5>}
                {!data && <h5>New song</h5>}
                {!data && <span className="btn btn-warning btn-icon-split" onClick={this.dataFromUltimateGuitar}>
                    <span className="icon text-white-50">
                      <i className="fas fa-cloud-download-alt"/>
                    </span>
                    <span className="text">Ultimate Guitar</span>
                </span> }
                {data && <NavToolbar prev={handlePrev} rand={handleRand} next={handleNext} up={()=>{}} down={()=>{}} text={navText} />}
                
                <Row>
                    <Col xs={12} sm={8} md={6} lg={4} className='mb-3'>
                        <Form.Group className='mb-1'>
                            <Form.Control
                                className='edit-form'
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e)=>this.setState({title:e.target.value})}
                            />

                            <Form.Control
                                className='edit-form'
                                type="text"
                                placeholder="Artist"
                                value={artist}
                                onFocus={this.handleArtistListShow}
                                onBlur={this.handleArtistListHide}
                      onChange={(e)=>this.setState({artist:e.target.value})}
                            />
                            {artistList && 'List'}
                            <Form.Control
                                className='edit-form'
                                type="text"
                                placeholder="Link"
                                value={link}
                                onChange={(e)=>this.setState({link:e.target.value})}
                            />
                        </Form.Group>
                  
                        <div style={{color:'black'}}>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                placeholder='Tags...'
                                options={Object.keys(player.tags).map(k =>{ return {value: parseInt(k), label:player.tags[k]}})}
                                value={tags.map( k => { return {value: k, label:player.tags[k]}})}
                                onChange={(v)=> v ? this.setState({tags: v.map(o => o.value)}) : this.setState({tags:[]})}
                            />
                        </div>
                        
                        <Rating
                            start={-1} stop={4}
                            initialRating={rank}
                            onChange={(v) => this.setState({rank:v}) }
                            emptySymbol="fas fa-fw fa-star text-gray-300"
                            fullSymbol={['danger','warning','primary','info','success', ].map(c=> "fas fa-fw fa-star text-"+c)}
                        /> { rankRange[rank] }
                    </Col>
                </Row>
                
                <textarea
                    wrap='off'
                    className='lyrics edit-textarea'
                    cols={cols - 1}
                    rows={rows}
                    value={lyrics}
                    onChange={(e) => this.setState({lyrics: e.target.value})}
                />
                
                <EditToolbar onLeave={this.handleExitEdit} onDelete={data?this.handleDelete:''} onSave={this.handleSave} />
                
            </React.Fragment>
        )
    }
}



