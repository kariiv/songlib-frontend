import React, {Component} from "react";
import {Col, Row,Form } from "react-bootstrap";
import Select from 'react-select';

import { saveSong, deleteSong } from '../../../actions/songs'

import history from "../../../history";

export default class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = this.getStates()
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

    handleSave = () => {
        const { title, artist, tags, lyrics, link, rank } = this.state;

        saveSong({
            id: (this.props.data ? this.props.data.id : ''),
            title: title || '',
            artist: artist || '',
            tags: tags.length > 0 ? tags.join(' '):'',
            lyrics: lyrics || '',
            link: link || '',
            rank: rank || 0,
        })
    }
    handleDelete = () => { deleteSong(this.props.data.s.id) }

    render() {
        const {data, player} = this.props;

        const split = this.state.lyrics.split('\n');
        const rows = split.length;
        const cols = Math.max.apply(null, split.map(l => l.length))
        return (
            <React.Fragment>
                {data && <h5>Edit <i className='fas fa-angle-right'/> {data.p.name} <i
                    className='fas fa-angle-right'/> {data.s.title}</h5>}
                {!data && <h5>New song</h5>}
                <Row>
                    <Col xs={12} sm={8} md={6} lg={4} className='mb-3'>
                        <Form.Group className=''>
                            <Form.Control
                                className='edit-form'
                                size="lg"
                                type="text"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={(e)=>this.setState({title:e.target.value})}
                            />

                            <Form.Control
                                className='edit-form'
                                type="text"
                                placeholder="Artist"
                                value={this.state.artist}
                                onChange={(e)=>this.setState({artist:e.target.value})}
                            />
                        </Form.Group>
                        Tags:
                        <div style={{color:'black'}}>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={Object.keys(player.tags).map(k =>{ return {value: parseInt(k), label:player.tags[k]}})}
                                value={this.state.tags.map( k => { return {value: k, label:player.tags[k]}})}
                                onChange={(v)=> v ? this.setState({tags: v.map(o => o.value)}) : this.setState({tags:[]})}
                            />
                        </div>
                    </Col>
                </Row>
                <textarea
                    wrap='off'
                    className='lyrics edit-textarea'
                    cols={cols - 1}
                    rows={rows}
                    value={this.state.lyrics}
                    onChange={(e) => this.setState({lyrics: e.target.value})}
                />
                <span className='flying-button text-center'>
                    {this.props.data && <span className="btn-circle btn-sm btn-danger shadow-sm mb-2" onClick={this.handleDelete}>
                            <i className="fas fa-trash fa-sm text-white-50"/></span>}
                    <span className="btn-circle btn-warning shadow-sm mb-2" onClick={() => {
                        data ? player.setSong(data.s) : history.push('/');
                    }}>
                            <i className="fas fa-door-open fa-sm text-white-50"/></span>
                    <span className="btn-circle btn-lg btn-success shadow-sm" onClick={this.handleSave}>
                        <i className="fas fa-check fa-sm text-white-50"/></span>
                </span>

            </React.Fragment>
        )
    }
}
