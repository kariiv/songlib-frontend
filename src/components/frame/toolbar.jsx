import React, { Component } from "react";

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.search = React.createRef();
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value})
    }

    handleClear = () => {
        this.setState({search: '', second:false})
    }

    render() {
        const { sideToggle, player } = this.props;
        const { search } = this.state;
        const searchRes = search ? player.searchSongs(search): [];

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" style={{maxWidth: '100vw'}}>
                <button className="btn btn-link d-md-none rounded-circle mr-3" onClick={sideToggle}>
                    <i className="fa fa-bars"/>
                </button>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <form>
                            <div className="input-group">
                                <input type="text"
                                       className="form-control bg-light border-0 small"
                                       placeholder="Search..."
                                       value={search}
                                       onChange={this.handleSearch}
                                       ref={this.search}
                                />
                                <div className="input-group-append">
                                    {!!!search && <button className="btn btn-primary" type="button" onClick={() => this.search.current.focus()}>
                                        <i className="fas fa-search fa-sm"/>
                                    </button>}

                                    { !!search && <button className="btn btn-danger" type="button" onClick={() => this.setState({search: ''})}>
                                        <i className="fas fa-times fa-sm" style={{paddingLeft:'0.12rem', paddingRight: '0.13rem'}}/>
                                    </button>}
                                </div>
                            </div>
                            <div className={"dropdown-list dropdown-menu shadow animated--grow-in scroll search" + (search && ' show')}>
                                {searchRes.map(s => <SongResult key={s.artist+s.title} doClear={this.handleClear} song={s} player={player} search={search}/>)}
                            </div>
                        </form>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Toolbar;


export const SongResult = ({song, active, search, player, doClear}) => {
    return (
        <span className="dropdown-item d-flex align-items-center" onClick={() => {
            player.setSongAll(song.id);
            doClear();
        }}>
            <div className={active && 'font-weight-bold'}>
                <MarkupText search={search} text={song.title}/>
                <div className="small text-gray-500"><MarkupText search={search} text={song.artist}/></div>
            </div>
        </span>
    )
}

const MarkupText = ({ search, text }) => {
    if (!search) return null
    let start = text.search(new RegExp(search, "i"));
    if (start === -1) return text;
    return (
        <React.Fragment>
            {start > 0 && text.substr(0, start)}
            <strong>{text.substr(start, search.length)}</strong>
            {start + search.length < text.length && text.substr(
                start + search.length,
                text.length - search.length - start
            )}
        </React.Fragment>
    )
}


export const Dropdown = ({className, badge, title, icon}) =>
    <li className={"nav-item dropdown no-arrow mx-1 " + className}>
        <span className="nav-link dropdown-toggle" id="messagesDropdown" role="button">
            <i className={"fas fa-fw " + icon}/>
            {badge && <span className="badge badge-danger badge-counter">{badge}</span>}
        </span>

        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
             aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">
                { title }
            </h6>
            <span className="dropdown-item d-flex align-items-center">
                <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60"
                         alt=""/>
                    <div className="status-indicator bg-success"/>
                </div>
                <div className="font-weight-bold">
                    <div className="text-truncate">Hi there! I am wondering if you can help me with a
                        problem I've been having.
                    </div>
                    <div className="small text-gray-500">Emily Fowler · 58m</div>
                </div>
            </span>
            <span className="dropdown-item d-flex align-items-center">
                <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60"
                         alt=""/>
                    <div className="status-indicator"/>
                </div>
                <div>
                    <div className="text-truncate">I have the photos that you ordered last month, how would
                        you like them sent to you?
                    </div>
                    <div className="small text-gray-500">Jae Chun · 1d</div>
                </div>
            </span>
            <span className="dropdown-item d-flex align-items-center">
                <div className="dropdown-list-image mr-3">
                    <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60"
                         alt=""/>
                    <div className="status-indicator bg-warning"/>
                </div>
                <div>
                    <div className="text-truncate">Last month's report looks great, I am very happy with the
                        progress so far, keep up the good work!
                    </div>
                    <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                </div>
            </span>
            {/*<a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>*/}
        </div>
    </li>
