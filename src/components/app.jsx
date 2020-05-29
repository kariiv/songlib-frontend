import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Sidebar, {
    SidebarHead,
    Devider,
    NavItem,
    NavHeader,
    NavDrop,
    // DropHeader,
    DropItem,
    SidebarToggle
} from './frame/sidebar';

import Toolbar from './frame/toolbar';

import SheetController from './pages/sheet/sheetController'
import Home from './pages/home'
import Tag from './pages/tag'

import {Container} from 'react-bootstrap'
import '../assets/scss/frame/sb-admin-2.scss';
import queryString from 'query-string';

import Player from '../assets/app/Player';

import {capitalize} from '../config';

const PlaylistsBuilder = ({ player }) => {
    const strategies = Object.values(player.playlistStrategies)
    return (
        <React.Fragment>
            <NavHeader label='Playlists'/>

            { strategies.length !== 0 && strategies.map(strat => {
                const playlists = Object.values(strat.playlists);
                if (playlists.length > 1) return (
                    <NavDrop
                        key={strat.name}
                        icon={strat.icon}
                        label={capitalize(strat.name)}
                        badge={{text: playlists.length}}
                        isActive={(_, location) => {
                            const {c} = queryString.parse(location.search);
                            return c === strat.name.toLowerCase()
                        }}
                    >
                        {playlists.map((pl)=>
                            <DropItem
                                key={pl.name}
                                label={pl.name}
                                badge={{text: pl.songs.length}}
                                isActive={(match, location) => {
                                    const {c, p} = queryString.parse(location.search);
                                    return c === strat.name.toLowerCase() && p === pl.name.toLowerCase()
                                }}
                                to={{
                                    pathname: "/play/",
                                    search: `?c=${strat.name.toLowerCase()}&p=${pl.name.toLowerCase()}`
                                }}
                        />)}
                    </NavDrop>
                );
                if (playlists.length === 1) return (
                    <NavItem
                        key={strat.name}
                        icon={strat.icon}
                        label={capitalize(strat.name)}
                        badge={{text: playlists[0].songs.length}}
                        isActive={(match, location) => {
                            const {c} = queryString.parse(location.search);
                            return c === strat.name.toLowerCase()
                        }}
                        to={{pathname: "/play/", search: `?c=${strat.name.toLowerCase()}&p=${playlists[0].name.toLowerCase()}`}}
                    />
                );
                return null
            })}

        </React.Fragment>
    )
}



class App extends Component {

    state = {
        player: new Player(this)
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar toggled={true}>
                    <SidebarHead brand={<>Songs <sup>2.0</sup></>} icon='fa-music'/>
                    {/*<NavItem icon='fa-home' label='Home' to='/'/>*/}
                    <Devider/>
                    <PlaylistsBuilder player={this.state.player}/>
                    <Devider/>
                    <NavHeader label='Utilities'/>
                    <NavItem
                        icon='fa-paper-plane'
                        label='Add new song'
                        to='/play/?edit=true'
                        isActive={(_, location) => {
                            const {c, p, s, edit} = queryString.parse(location.search);
                            return !c && !p && !s && edit
                        }}
                    />
                    <NavItem icon='fa-tag' label='Add new tag' to='/tag'/>

                    <Devider className='mb-0'/>

                    <NavItem icon='fa-cog' label='Settings' to='/setting'/>
                    <NavDrop icon='fa-wrench' label='Theme' />

                    <Devider/>
                    <SidebarToggle/>
                </Sidebar>

                <div id="content-wrapper" className="d-flex flex-column" onClick={Sidebar.hideDrops}>
                    <div id="content" >
                        <Toolbar sideToggle={Sidebar.toggle}/>
                        <Container fluid>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/play/' render={(props) => <SheetController player={this.state.player} {...props}/>}/>
                                <Route exact path='/tag/' render={(props) => <Tag player={this.state.player} {...props}/>}/>
                                <Route exact path='/settings/' render={() => null}/>
                                <Route exact path='/theme/' render={() => null}/>
                            </Switch>
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

            </React.Fragment>
        )
    }
}
export default App;