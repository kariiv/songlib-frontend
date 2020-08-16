import React from "react";
import '../../../assets/scss/css.css';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import NotFound from '../404';
import SheetController from './sheetController';
import Edit from './edit';

export default ({player, history}) => {
    if (!player.loaded) return null;
    const {c, p, s, sort, edit} = queryString.parse(history.location.search);

    const qSong = player.getQueryResult();

    if (edit) {
        if (!qSong && (c || p || s)) { // Push new URL
            return (<Redirect to={{
                pathname: "/play/",
                search: "?edit=true"
            }}/>)
        }
        if (s && qSong) {
            if (!qSong.s.lyrics) return <h3>Waiting lyrics</h3>
            return <SheetController edit={true} data={qSong} player={player}/>
        }
        return <Edit edit={true} player={player}/>
    }

    if (!qSong) return <NotFound/>

    if (!c || !p || !s) { // Push new URL
        if (sort) qSong.sort = sort
        return (<Redirect to={{
                pathname: "/play/",
                search: player.getQueryUrl(qSong)
            }}/>)
    }

    return <SheetController data={qSong} player={player}/>;
}