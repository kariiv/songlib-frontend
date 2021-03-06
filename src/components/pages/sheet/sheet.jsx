import React, { Component, Fragment} from "react";
import '../../../assets/scss/css.css';
import LANGUAGES_DICT from "../../../assets/app/langs";

import {capitalize} from '../../../config'
import Rating from 'react-rating'

import { safari } from "../../../config";

import {SheetToolbar, NavToolbar} from "./toolbar";
import SheetHistory from "./gadgets/sheetHistory";


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
    static FONT_SIZE_KEY = 'f_s'

    state = {
        fontSize: parseInt(localStorage.getItem(Sheet.FONT_SIZE_KEY)) || Sheet.NORMAL_FONT
    }

    handleEdit = () => {
        const {player, controller, data} = this.props;
        setTimeout(controller.scrollTop);
        if (controller.state.autoscroll) controller.handleScroll()
        player.editSong(data)
    }
    
    handleSizeUp = () => {
        const { fontSize } = this.state;
        if (fontSize < Sheet.MAX_FONT)
            this.setFontSize(fontSize + 1);
    }
    handleSizeDown = () => {
        const { fontSize } = this.state;
        if (fontSize > Sheet.MIN_FONT)
            this.setFontSize(fontSize - 1);
    }
    handleSizeReset = () => {
        const { fontSize } = this.state;
        if (fontSize !== Sheet.NORMAL_FONT)
            this.setFontSize(Sheet.NORMAL_FONT);
    }

    setFontSize = (size) => {
        localStorage.setItem(Sheet.FONT_SIZE_KEY, size)
        this.setState({fontSize: size});
    }
    
    getLineHeight = () => {
        const slope = 0.06;
        const add = 0;
        return (slope * this.state.fontSize + add).toString() + 'rem';
    }

    handleTransposeDown = () => {
        const {data, player} = this.props;
        player.transposeCount(data.s, -1)
    }
    handleTransposeUp = () => {
        const {data, player} = this.props;
        player.transposeCount(data.s, 1);
    }
    

    render() {
        const {data, player, controller} = this.props;
        const {handlePrev, handleNext, handleRand} = controller;
        const {fontSize} = this.state;
        const {c, p, s} = data;
        
        const navText = {
            now: s.index,
            total: p.songs.length,
            level: s.getTransposition()
        }

        return (
            <Fragment>
                <h5>{capitalize(c.name)} <i className='fas fa-angle-right' /> {p.name}</h5>
                
                <NavToolbar prev={handlePrev} rand={handleRand} next={handleNext} up={this.handleTransposeUp} down={this.handleTransposeDown} text={navText} />

                <div className="titles mb-3">
                    <h3 className="title">{s.title}</h3>

                    <h6 className="artist mb-0"> {s.artist}</h6>
                    {s.lang && <h6 className="mb-0">{LANGUAGES_DICT[s.lang].label}</h6>}

                    <Rating
                        start={-1} stop={4}
                        initialRating={s.rank}
                        emptySymbol="fas fa-fw fa-star text-gray-300"
                        fullSymbol={['danger','warning','primary','info','success', ].map(c=> "fas fa-fw fa-star text-"+c)} readonly
                    />

                    <div className="tags-text mb-0">{s.getTags().map(t => <span key={t.getId()} className="badge badge-primary ml-1">#{t.getName()}</span>)}</div>
                </div>
                
                <p className="lyrics"
                    ref={(lyrics) => this.lyrics = lyrics}
                    style={ {marginRight: safari ? '-7rem' : '',
                             fontSize: this.state.fontSize,
                             lineHeight: this.getLineHeight() }}
                >{s.display()}</p>

                <SheetHistory data={data} player={player}/>
                <SheetToolbar onEdit={this.handleEdit} onFontIn={this.handleSizeUp} onFontOut={this.handleSizeDown} onFontReset={this.handleSizeReset} onScroll={controller.handleScroll} copyText={s.display} autoscroll={controller.state.autoscroll} fontSize={fontSize}/>
            </Fragment>
        );
    }
}