import React from "react";
import '../../../assets/scss/css.css';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import NotFound from '../404';
import Sheet from './sheet';
import Edit from './edit';

export default ({player, history}) => {
    if (!player.loaded) return null;
    const {c, p, s, edit} = queryString.parse(history.location.search);

    const qSong = player.getQueryResult(c, p, s);

    if (edit) {
        if (s && qSong) {
            if (!qSong.s.lyrics) return <h3>Waiting lyrics</h3>
            return <Edit data={qSong} player={player}/>
        }
        else return <Edit player={player}/>
    }

    if (!qSong) return <NotFound/>

    if (!c || !p || !s) { // Push new URL
        // history.push('/play/' + player.getQueryUrl(exist.c, exist.p, exist.s))
        return (<Redirect to={{
                pathname: "/play/",
                search: player.getQueryUrl(qSong)
            }}/>)
    }

    return <Sheet data={qSong} player={player}/>;
}