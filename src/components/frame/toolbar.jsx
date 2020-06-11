import React, { useState, Component } from "react";

class Toolbar extends Component {
    state = {
        search: '',
        second: false
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value})
    }

    handleClear = () => {
        this.setState({search: '', second:false})
    }

    render() {
        const { sideToggle, player } = this.props;
        const { search, second } = this.state;
        const searchRes = search ? player.searchSongs(search): [];

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow" style={{maxWidth: '100vw'}}>
                <button className="btn btn-link d-md-none rounded-circle mr-3" onClick={sideToggle}>
                    <i className="fa fa-bars"/>
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input type="text"
                               className="form-control bg-light border-0 small"
                               placeholder="Search for..."
                               value={search}
                               onChange={this.handleSearch}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm"/>
                            </button>
                        </div>
                    </div>
                    <div className={"dropdown-list dropdown-menu shadow animated--grow-in scroll search" + (search && ' show')}>
                        {!second && searchRes.map(s => <SongResult key={s.artist+s.title} doClear={this.handleClear} song={s} player={player} search={search}/>)}
                    </div>
                </form>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow d-sm-none">
                    <span className="nav-link dropdown-toggle" id="searchDropdown" role="button" onClick={() => this.setState({second: !this.state.second})}>
                        <i className="fas fa-search fa-fw"/>
                    </span>

                        <div className={"dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" + (second? ' show':'')}>
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text"
                                           className="form-control bg-light border-0 small"
                                           placeholder="Search for..."
                                           value={search}
                                           onChange={this.handleSearch}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm"/>
                                        </button>
                                    </div>
                                </div>
                                <div className={"dropdown-list dropdown-menu shadow animated--grow-in search" + (search && ' show')} style={{position:'initial'}}>
                                    {second && searchRes.map(s => <SongResult key={s.artist+s.title} song={s} player={player} doClear={this.handleClear} search={search}/>)}
                                </div>
                            </form>
                        </div>
                    </li>

                    <Messages/>
                </ul>
            </nav>
        )
    }
}

export default Toolbar;


const Messages = () => {
    // const [messages, setMessages] = useState([])
    const [show, setShow] = useState(false)

    return (
        <li className="nav-item dropdown no-arrow mx-1">
            <span className="nav-link dropdown-toggle" id="messagesDropdown" role="button"
               data-toggle="dropdown" onClick={() =>setShow(!show)}>
                <i className="fas fa-envelope fa-fw"/>

                <span className="badge badge-danger badge-counter">7</span>
            </span>

            <div className={"dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"+ (show?' show':'')}>
                <h6 className="dropdown-header">Messages</h6>
                <SearchResult title={`Last month's report looks great, I am very happy with the
                            progress so far, keep up the good work!`}
                              description='Emily Fowler · 58m'
                              active
                />
                <SearchResult title={`Hi there! I am wondering if you can help me with a
                            problem I've been having.`}
                              description='Jae Chun · 1d'
                              active
                />
                <SearchResult title={`I have the photos that you ordered last month, how would
                            you like them sent to you?`}
                              description='Margit 8h'
                />
                <form className="d-sm-inline-block form-inline mw-100 navbar-search m-1 mr-3">
                    <div className="input-group">
                        <input type="text"
                               className="form-control bg-light border-0 small"
                               placeholder="Message"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-paper-plane fa-sm"/>
                            </button>
                        </div>
                    </div>
                </form>
                {/*<a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>*/}
            </div>
        </li>
    )
}

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

export const SearchResult = ({title, description, active}) => {
    const [short, setShort] = useState(true)
    return (
        <span className="dropdown-item d-flex align-items-center" onClick={() => setShort(!short)}>
            <div className={active && 'font-weight-bold'}>
                <div className={short?"text-truncate":''}>title</div>
                <div className="small text-gray-500">{description}</div>
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
