import React, { Component, Fragment } from "react";
import '../../../assets/scss/css.css';

import VideoCard from './videoCard';

import Sheet from './sheet';
import Edit from './edit';


export default class SheetController extends Component {
    
    static TRANS_UP = 87;
    static TRANS_DOWN = 83;

    state = {
        videoLoaded: false,
        videoShow: false
    }

    handleVideoOpen = () => {
        this.setState({videoShow: !this.state.videoShow})
    }
    
    handleVideoLoad = () => {
        this.setState({videoLoaded: true})
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
    
    
    handleSongChange(e) {
        e.preventDefault();
        setTimeout(this.scrollTop);
        window.getSelection().removeAllRanges();
        if (this.state.autoscroll) this.handleScroll()
        this.setState({showVideo:false, iframe:false})
    }

    render() {
        const {data, player, edit} = this.props;
        const {videoShow, videoLoaded} = this.state;
        const {s} = data;

        return (
            <Fragment>
               
                {!edit && <Sheet controller={this} {...this.props} />}
                {edit && <Edit controller={this} {...this.props} />}

                { s.link && <VideoCard show={videoShow} link={player.getYoutubeEmbed(s.link)} load={videoLoaded} onClick={this.handleVideoOpen} onLoad={this.handleVideoLoad}/>}
                
            </Fragment>
        );
    }
}