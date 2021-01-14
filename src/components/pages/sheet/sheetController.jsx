import React, { Component, Fragment } from "react";
import '../../../assets/scss/css.css';

import VideoCard from './videoCard';

import Sheet from './sheet';
import Edit from './edit';


export default class SheetController extends Component {

    state = {
        videoLoaded: false,
        videoShow: false,
        autoscroll: null,
    }


    
    componentWillUnmount() {
        if (this.state.autoscroll !== null) this.handleScroll()
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
        this.setState({videoShow:false, videoLoaded:false})
    }
    
    handleScroll = () => {
        if (this.state.autoscroll === null)
            this.setState({ autoscroll: setInterval(this.scroll, 170) })
        else {
            clearInterval(this.state.autoscroll);
            this.setState({ autoscroll: null })
        }
    }
    
    scroll = () => window.scrollBy(0, 1)
    scrollTop = () => window.scrollTo(0, 0)

    render() {
        const {data, edit} = this.props;
        const {videoShow, videoLoaded} = this.state;
        const {s} = data;
        const link = s.getLink() + "?rel=0&modestbranding=1&playsinline=1"

        return (
            <Fragment>
                {!edit && <Sheet controller={this} {...this.props} />}
                {edit && <Edit controller={this} {...this.props} />}

                { link && <VideoCard show={videoShow} link={link} load={videoLoaded} onClick={this.handleVideoOpen} onLoad={this.handleVideoLoad}/>}
            </Fragment>
        );
    }
}