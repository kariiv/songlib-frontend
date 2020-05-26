import React, { Component } from "react";

import Sidebar, {
    SidebarHead,
    Devider,
    NavItem,
    NavHeader,
    NavDrop,
    DropHeader,
    DropItem,
    SidebarToggle
} from './frame/sidebar';

import Toolbar from './frame/toolbar';

import NotFound from './pages/404';
import Sheet from './pages/sheet'

import {Container} from 'react-bootstrap'
import '../assets/scss/frame/sb-admin-2.scss';

class App extends Component {
    state = {
        songs: [],
        tags: [],
        selected: null,
    }

    componentDidMount() {

    }

    loadSongs = () => {

    }

    handleSelection = (id) => {

    }

    render() {
        return (
            <React.Fragment>
                <Sidebar toggled={false}>
                    <SidebarHead brand={<>Songs <sup>2.0</sup></>} icon='fa-music'/>
                    <NavItem icon='fa-home' label='Home' to='/'/>
                    <Devider/>
                    <NavHeader label='Playlists'/>

                    <NavItem icon='fa-music' label='All' to='/all'/>

                    <NavItem icon='fa-history' label='Latest' to='/latest'/>

                    <NavDrop icon='fa-tags' label='Tags'>
                        <DropItem label='Eesti'/>
                        <DropItem label='English'/>
                        <DropItem label='Christmas'/>
                        <DropItem label='E2P'/>
                    </NavDrop>

                    <NavDrop icon='fa-graduation-cap' label='Difficulty'>
                        <DropItem label='Easy' icon='fa-star-o'/>
                        <DropItem label='Medium' icon='fa-star-half'/>
                        <DropItem label='Hard' icon='fa-star'/>
                    </NavDrop>

                    <NavDrop icon='fa-th-list' label='Collections'>
                        <DropHeader label='Latest'/>
                        <DropItem label='Best GA Aftekas'/>
                        <DropItem label='BEST' />
                        <DropItem label='Hard' />
                        <DropHeader label='Yours'/>
                        <DropItem label='BEST' />
                        <DropItem label='Saunaõhtu' />
                    </NavDrop>

                    <Devider/>

                    <NavHeader label='Utilities'/>
                    <NavItem icon='fa-paper-plane' label='Add new song' to='/new'/>
                    <NavItem icon='fa-tag' label='Add new tag' to='/tag'/>

                    <Devider className='mb-0'/>

                    <NavItem icon='fa-cog' label='Settings' to='/setting'/>
                    <NavDrop icon='fa-wrench' label='Theme' >
                        <DropItem label='Easy' icon='fa-star-o'/>
                        <DropItem label='Medium' icon='fa-star-half'/>
                    </NavDrop>

                    <Devider/>
                    <SidebarToggle/>
                </Sidebar>

                <div id="content-wrapper" className="d-flex flex-column" onClick={Sidebar.hideDrops}>
                    <div id="content">
                        <Toolbar sideToggle={Sidebar.toggle}/>
                        <Container fluid>
                            {/*<NotFound/>*/}
                            <Sheet/>
                        </Container>
                    </div>


                    <footer className="sticky-footer bg-white">
                        <Container className="my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Mr.Toruabi 2020</span>
                            </div>
                        </Container>
                    </footer>
                </div>
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"/>
                </a>
            </React.Fragment>
        )
    }
}
export default App;