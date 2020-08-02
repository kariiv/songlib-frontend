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
import Footer from './frame/footer';

import SheetController from './pages/sheet/sheetController'
import Home from './pages/home'
import Tag from './pages/tag'

import {Container} from 'react-bootstrap'
import '../assets/scss/frame/sb-admin-2.scss';
import queryString from 'query-string';

import Player from '../assets/app/Player';

import {capitalize} from '../config';
import history from "../history";

class App extends Component {

    state = {
        player: new Player(this)
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar toggled={true}>
                    <SidebarHead brand={<>Songs <sup>2.0</sup></>} icon='fa-music'/>
                    <Devider/>
                    <PlaylistsBuilder player={this.state.player}/>
                    <Devider/>
                    <NavHeader label='Utilities'/>
                    <SortBuilder player={this.state.player}/>
                    <NavItem
                        icon='fa-paper-plane'
                        label='Add new song'
                        to='/play/?edit=true'
                        isActive={(_, location) => {
                            const {c, p, s, edit} = queryString.parse(location.search);
                            return !c && !p && !s && edit
                        }}
                    />
                    <NavItem icon='fa-tag' label='Tag manager' to='/tag'/>

                    <Devider className='mb-0'/>

                    <NavItem icon='fa-cog' label='Settings' to='/settings'/>
                    <NavItem icon='fa-redo' label='Refresh' onClick={this.state.player.init} />
                    <NavItem icon='fa-info' label='Info' onClick={()=>console.log('Sry!')} />

                    <Devider/>
                    <SidebarToggle/>
                </Sidebar>

                <div id="content-wrapper" className="d-flex flex-column" onClick={Sidebar.hideDrops}>
                    <div id="content" >
                        <Toolbar sideToggle={Sidebar.toggle} player={this.state.player}/>
                        <Container fluid>
                            <Switch>
                                <Route exact path='/' render={(props) => <Home player={this.state.player} {...props}/>}/>
                                <Route exact path='/play/' render={(props) => <SheetController player={this.state.player} {...props}/>}/>
                                <Route exact path='/tag/' render={(props) => <Tag player={this.state.player} {...props}/>}/>
                                <Route exact path='/settings/' render={() => null}/>
                                <Route exact path='/theme/' render={() => null}/>
                            </Switch>
                        </Container>
                    </div>

                    <Footer/>
                </div>

            </React.Fragment>
        )
    }
}

const PlaylistsBuilder = ({ player }) => {
    const strategies = Object.values(player.playlistStrategies)
    const { sort } = queryString.parse(history.location.search);

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
                                    search: `?c=${strat.name.toLowerCase()}&p=${pl.name.toLowerCase()}${sort?'&sort='+sort:''}`
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
                        to={{pathname: "/play/", search: `?c=${strat.name.toLowerCase()}&p=${playlists[0].name.toLowerCase()}${sort?'&sort='+sort:''}`}}
                    />
                );
                return null
            })}

        </React.Fragment>
    )
}

const SortBuilder = ({ player }) => {
    const sorts = Object.values(player.sorts)
    const {c, p} = queryString.parse(history.location.search)
    const searchPath = player.getQueryUrl({c, p})
    return (
        <React.Fragment>
            <NavDrop
                icon='fa-sort'
                label='Sorting'
                badge={{text: sorts.length}}
                isActive={() => true}
            >
                { sorts.length !== 0 && sorts.map((sorting, index) => {
                    return (
                        <DropItem
                            key={sorting.id}
                            label={sorting.name}
                            isActive={(match, location) => {
                                const {sort} = queryString.parse(location.search);
                                if (index === 0 && !sort) return true;
                                return sort === sorting.id.toLowerCase()
                            }}
                            to={{
                                pathname: "/play/",
                                search: `${searchPath}&sort=${sorting.id}`
                            }}
                        />
                    );
                })}
            </NavDrop>

        </React.Fragment>
    )
}

export default App;