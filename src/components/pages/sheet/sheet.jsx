import React, { Component } from "react";
import '../../../assets/scss/css.css';

import {Row, Col, Card} from 'react-bootstrap'

import {capitalize} from '../../../config'
import Rating from 'react-rating'

import { safari } from "../../../config";

export default class Sheet extends Component {

    state = {
        autoscroll: null,
        iframe: false,
        showVideo: false
    }

    componentWillUnmount() {
        if (this.state.autoscroll !== null) this.handleScroll()
        clearTimeout(this.historyTimeout)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.s !== this.props.data.s) this.makeHistoryTimeout();

    }
    componentDidMount() {
        this.makeHistoryTimeout();
    }

    makeHistoryTimeout() {
        clearTimeout(this.historyTimeout)
        this.historyTimeout = setTimeout(this.handleHistory, 60000)
        // this.historyTimeout = setTimeout(this.handleHistory, 2000)
    }

    handleHistory = () => {
        this.props.player.toHistory(this.props.data.s.id)
    }
    handleVideo = () => {
        this.setState({showVideo: !this.state.showVideo})
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
        this.setState({showVideo:false})
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
                    <Col className='text-left align-self-start pl-1 pr-0'>
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

                <div className="titles mb-3">
                    <h3 className="title">{s.title}</h3>
                    <h6 className="artist mb-0"> {s.artist}</h6>
                    <Rating
                        start={-1} stop={4}
                        initialRating={s.rank}
                        emptySymbol="fas fa-fw fa-star text-gray-300"
                        fullSymbol={['danger','warning','primary','info','success', ].map(c=> "fas fa-fw fa-star text-"+c)}
                        readonly
                    />
                    <div className="tags-text mb-0">{s.tags.map(t=> <span key={t} className="badge badge-primary ml-1">#{player.tags[t]}</span>)}</div>
                </div>
                <p className="lyrics" style={safari? {marginRight: '-7rem'}:{}}>{s.display}</p>

                { s.link && <Card className={"shadow border-left-primary video-card"} style={this.state.showVideo ?{}:{width:0}}>
                    <Card.Body className='p-0'>
                        <span className="btn-circle btn-danger shadow-sm video-button" onClick={this.handleVideo}>
                            <i className={"fas fa-sm text-white-50 " + (this.state.showVideo? 'fa-angle-right':'fa-angle-left')}/>
                        </span>
                        {(this.state.showVideo || this.state.iframe) && <iframe title='Yt' onLoad={() => this.setState({iframe: true})} frameBorder={0} width='100%'
                                 height={120} allowFullScreen={0} src={player.getYoutubeEmbed(s.link)} style={{marginBottom:-7}}/>}
                    </Card.Body>
                </Card>}


                <span className='flying-button text-center'>
                    <span className="btn-circle btn-warning shadow-sm mb-2" onClick={this.handleEdit}>
                        <i className="fas fa-edit fa-sm text-white-50"/>
                    </span>
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