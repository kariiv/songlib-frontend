import React, { Component, Fragment} from "react";
import '../../../assets/scss/css.css';

import {capitalize} from '../../../config'
import Rating from 'react-rating'

import { safari } from "../../../config";

import {SheetToolbar, NavToolbar} from "./toolbar";


export default class Sheet extends Component {
    static NEXT = 68;
    static PREVIOUS = 65;
    static RANDOM = 82;
    static SCROLL = 32;
    static TRANS_UP = 87;
    static TRANS_DOWN = 83;
    static MAX_FONT = 28;
    static MIN_FONT = 4;
    static NORMAL_FONT = 14;

    state = {
        autoscroll: null,
        fontSize: Sheet.NORMAL_FONT
    }

    handleKeyDown = (e) => {
        if (e.shiftKey)
            switch( e.keyCode ) {
                case Sheet.TRANS_DOWN:
                    this.handleTransposeDown()
                    break;
                case Sheet.TRANS_UP:
                    this.handleTransposeUp()
                    break;
                case Sheet.SCROLL:
                    this.handleScroll(e)
                    break;
                case Sheet.NEXT:
                    this.handleNext(e)
                    break;
                case Sheet.PREVIOUS:
                    this.handlePrev(e)
                    break;
                case Sheet.RANDOM:
                    this.handleRand(e)
                    break;
                default:
                    break;
            }
    }

    componentWillUnmount() {
        if (this.state.autoscroll !== null) this.handleScroll()
        clearTimeout(this.historyTimeout);
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data.s !== this.props.data.s) this.makeHistoryTimeout();
    }
    
    componentDidMount() {
        this.makeHistoryTimeout();
        document.addEventListener("keydown", this.handleKeyDown);
    }

    makeHistoryTimeout() {
        clearTimeout(this.historyTimeout)
        this.historyTimeout = setTimeout(this.handleHistory, 60000)
        // this.historyTimeout = setTimeout(this.handleHistory, 2000)
    }

    handleHistory = () => {
        this.props.player.toHistory(this.props.data.s.id)
    }
    
    handleScroll = () => {
        if (this.state.autoscroll === null)
            this.setState({ autoscroll: setInterval(this.scroll, 170) })
        else {
            clearInterval(this.state.autoscroll);
            this.setState({ autoscroll: null })
        }
    }

    handleEdit = (e) => {
        const {player, controller} = this.props;
        setTimeout(controller.scrollTop);
        if (controller.state.autoscroll) controller.handleScroll()
        player.editSong(this.props.data)
    }

    
    handleSizeUp = () => {
        const { fontSize } = this.state;
        if (fontSize < Sheet.MAX_FONT)
        this.setState({fontSize: fontSize + 1});
    }
    handleSizeDown = () => {
        const { fontSize } = this.state;
        if (fontSize > Sheet.MIN_FONT)
        this.setState({fontSize: fontSize - 1});
    }
    handleSizeReset = () => {
        const { fontSize } = this.state;
        if (fontSize !== Sheet.NORMAL_FONT)
        this.setState({fontSize: Sheet.NORMAL_FONT});
    }
    
    getLineHeight = () => {
        const slope = 0.07;
        const add = 0;
        return (slope * this.state.fontSize + add).toString() + 'rem';
    }

    handleTransposeDown = () => {
        const {data, player} = this.props;
        player.transposeDown(data.s)
    }
    handleTransposeUp = () => {
        const {data, player} = this.props;
        player.transposeUp(data.s);
    }

    scroll = () => window.scrollBy(0, 1)
    scrollTop = () => window.scrollTo(0, 0)

    render() {
        const {data, player, controller} = this.props;
        const {handlePrev, handleNext, handleRand} = controller;
        const {fontSize, autoscroll} = this.state;
        const {c, p, s} = data;
        
        const navText = {
            now: s.index,
            total: p.songs.length,
            level: s.transpose
        }

        return (
            <Fragment>
                <h5>{capitalize(c.name)} <i className='fas fa-angle-right' /> {p.name}</h5>
                
                <NavToolbar prev={handlePrev} rand={handleRand} next={handleNext} up={this.handleTransposeUp} down={this.handleTransposeDown} text={navText} />

                <div className="titles mb-3">
                    <h3 className="title">{s.title}</h3>
                    
                    <h6 className="artist mb-0"> {s.artist}</h6>
                    
                    <Rating
                        start={-1} stop={4}
                        initialRating={s.rank}
                        emptySymbol="fas fa-fw fa-star text-gray-300"
                        fullSymbol={['danger','warning','primary','info','success', ].map(c=> "fas fa-fw fa-star text-"+c)} readonly
                    />
                    
                    <div className="tags-text mb-0">{s.tags.map(t=> <span key={t} className="badge badge-primary ml-1">#{player.tags[t]}</span>)}</div>
                </div>
                
                <p className="lyrics" 
                    ref={(lyrics) => this.lyrics = lyrics} 
                    style={ {marginRight: safari ? '-7rem' : '', 
                             fontSize: this.state.fontSize,
                             lineHeight: this.getLineHeight() }}
                >{s.display}</p>

                <SheetToolbar onEdit={this.handleEdit} onFontIn={this.handleSizeUp} onFontOut={this.handleSizeDown} onFontReset={this.handleSizeReset} onScroll={this.handleScroll} copyText={s.display} autoscroll={autoscroll} fontSize={fontSize}/>
                
            </Fragment>
        );
    }
}