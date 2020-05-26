import React, { Component } from "react";

export default class Navbar extends Component {

    render() {
        return (
        <div className="page-wrapper chiller-theme" style={{float: "left"}}>
            <nav id="sidebar" className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <a className="unselectable">Filter panel</a>
                        <div id="close-sidebar">
                            <i className="fas fa-times"/>
                        </div>
                    </div>
                    <div className="sidebar-search">
                        <div className="autocomplete">
                            <div className="input-group">
                                <input id="search" type="text" autoComplete="off"
                                       className="form-control search-menu search"
                                       placeholder="Search..."/>
                                    <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="fa fa-search" aria-hidden="true"/>
                                </span>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-menu">
                        <ul>
                            <li className="header-menu">
                                <span>Playlists</span>
                            </li>

                            <li>
                                <a href="#" id="all">
                                    <i className="fa fa-home"/>
                                    <span>All</span>
                                </a>
                            </li>

                            <li>
                                <a href="#" id="latest">
                                    <i className="fa fa-clock"/>
                                    <span>Latest</span>
                                </a>
                            </li>

                            <li className="sidebar-dropdown">
                                <a>
                                    <i className="fa fa-tags"/>
                                    <span>Tags</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul id="tags"/>
                                </div>
                            </li>

                            <li className="sidebar-dropdown">
                                <a>
                                    <i className="fa fa-th-list"/>
                                    <span>Artists</span>
                                </a>
                                <div className="sidebar-submenu">
                                    <ul id="artists"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-footer">
                    <a href="#" id="make-joke">
                        <i className="fa fa-envelope"/>
                    </a>
                    <a id="lyrics-mode">
                        <i style={{"MozUserSelect": "none"}}>Full Lyrics</i>
                    </a>
                    <a id="song-new">
                        <i className="fa fa-cog"/>
                        <span className="badge-sonar"/>
                    </a>
                </div>
            </nav>
        </div>
        )
    }
}