import React, { Component } from "react";
import '../../../assets/scss/css.css';

import { Row, Col } from 'react-bootstrap'

import {capitalize} from '../../../config'

export default class Sheet extends Component {

    state = {
        autoscroll: null,
        iframe: false,
    }

    componentWillUnmount() {
        if (this.state.autoscroll !== null) this.handleScroll()
    }

    handleScroll = () => {
        if (this.state.autoscroll === null)
            this.setState({ autoscroll: setInterval(this.scroll, 170) })
        else {
            clearInterval(this.state.autoscroll);
            this.setState({ autoscroll: null })
        }
    }

    handleNext = (e) => {
        this.handleSongChange(e)
        this.props.player.next()
    }
    handlePrev = (e) => {
        this.handleSongChange(e)
        this.props.player.prev()
    }
    handleRand = (e) => {
        this.handleSongChange(e)
        this.props.player.rand()
    }
    handleEdit = (e) => {
        this.handleSongChange(e)
        this.props.player.editSong(this.props.data)
    }

    handleSongChange(e) {
        e.preventDefault()
        setTimeout(this.scrollTop)
        window.getSelection().removeAllRanges();
        if (this.state.autoscroll) this.handleScroll()
    }

    scroll = () => window.scrollBy(0, 1)
    scrollTop = () => window.scrollTo(0, 0)


    render() {
        const {data, player} = this.props;
        const {c, p, s} = data;
        return (
            <React.Fragment>
                <h4>{capitalize(c.name)} <i className='fas fa-angle-right' /> {p.name}</h4>
                <Row className='mb-2'>
                    <Col className='text-left align-self-start'>
                    <span className="btn-circle btn-primary shadow-sm" onClick={this.handlePrev}>
                    <i className="fas fa-angle-left fa-sm text-white-50"/></span>
                        <strong className='text-black mr-1 ml-1' onClick={this.handleRand}>{s.index}/{p.songs.length}</strong>
                        <span className="btn-circle btn-primary shadow-sm" onClick={this.handleNext}>
                    <i className="fas fa-angle-right fa-sm text-white-50"/></span>

                        <span className="btn-circle btn-sm btn-info shadow-sm ml-3" onClick={() => player.transposeDown(s)}>
                    <i className="fas fa-angle-down fa-sm text-white-50"/></span>
                        <strong className='text-black mr-1 ml-1'>{s.transpose}</strong>
                        <span className="btn-circle btn-sm btn-info shadow-sm" onClick={() => player.transposeUp(s)}>
                    <i className="fas fa-angle-up fa-sm text-white-50"/></span>
                    </Col>
                </Row>

                <div id="youtube">
                    {/*<iframe title='Yt' onLoad={() => setFrame(true)} style={(s.link && frame)? {display: 'block'}:{}} frameBorder={0} width='100%' height='100px' className='yt-iframe' allowFullScreen={0} src={s.link}/>*/}
                </div>

                <div className="titles mb-2">
                    <h3 className="title">{s.title}</h3>
                    <h6 className="artist mb-2"> {s.artist}</h6>
                    <div className="tags-text">{s.tags.map(t=> '#'+ player.tags[t]).join(' ')}</div>
                </div>
                <p className="lyrics">{s.display}</p>
                <span className='flying-button text-center'>
                {/*<span className="btn-circle btn-sm btn-warning shadow-sm" onClick={() => {}}>*/}
                {/*    <i className="fas fa-edit fa-sm text-white-50"/></span>*/}

                <span className="btn-circle btn-warning shadow-sm mb-2" onClick={this.handleEdit}>
                    <i className="fas fa-edit fa-sm text-white-50"/></span>
                {/*<span className="btn-circle btn-lg btn-warning shadow-sm" onClick={() => {}}>*/}
                {/*    <i className="fas fa-edit fa-sm text-white-50"/></span>*/}
                <span className={"btn btn-icon-split" + (this.state.autoscroll? ' btn-success':' btn-primary')} onClick={this.handleScroll}>
                    <span className='icon text-white-50'>
                        <i className="fas fa-angle-down fa-sm text-white-50"/>
                    </span>
                    <span className='text'>Autoscroll</span>
                </span>
            </span>
            </React.Fragment>
        );
    }
}