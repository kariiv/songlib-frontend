import MusicTheory from './MusicTheory';

import { getAllSongs, getSong } from '../../actions/songs';
import Song from './object/Song';
import { getAllTags } from '../../actions/tags';
import history from '../../history';
import queryString from 'query-string';

import {
    AllStrategy,
    // LatestStrategy,
    // ArtistStrategy,
    // TagStrategy,
    // LinkStrategy,
    // RankStrategy,
    // HistoryStrategy,
    // CollectionStrategy
} from './playlist/PlaylistStrategy';

import BaseSorter from "./sorter/baseSorter";

class Player {

    // Song = {id:'', link:'', title:'', artist:'', tags:[], rank:0, transpose:0, lyrics:'', display:'', time:0};
    static HISTORY_SIZE = 100;

    constructor(component) {
        this.component = component;

        this.me = ''; // User()
        
        this.songs = {};
        this.tags = {};

        this.artist_like = [];
        this.song_like = [];
        this.user_follow = [];
        
        this.playlistStrategies = {};
        this.sorts = {};
        
        this.loaded = false;
        this.init();
        
        this.addStrategy(new AllStrategy(this))
        // this.addStrategy(new ArtistStrategy(this,4))
        // this.addStrategy(new RankStrategy(this))
        // this.addStrategy(new TagStrategy(this, 5))
        // this.addStrategy(new LinkStrategy(this))
        // this.addStrategy(new HistoryStrategy(this))
        
        this.addSorter(new BaseSorter());
    }
    
    getSongsId() {
        return Object.keys(this.songs);
    }
    getSongsData() {
        return Object.values(this.songs);
    }

    _mapToDict(data, key) {
        if (!key) return {}
        return data.reduce((a,x) => ({...a, [x[key]]: x}), {})
    }

    refreshComponent = () => this.component.setState({player: this})

    init = async (e) => {
        if (e) e.preventDefault()
        
        this.songs = await this.getAllSongs();
        this.tags = await getAllTags();
        
        Object.values(this.playlistStrategies).forEach(strat => strat.makePlaylists())
        this.loaded = true;
        this.refreshComponent();
    }
    
    async getAllSongs() {
        const songs = await getAllSongs();
        return this._mapToDict(songs.map(s => new Song(s)), 'id');
    }
    
    async getSongLyrics(id) {
        return (await getSong(id)).lyrics;
    }

    addStrategy(strategy) {
        if (this.playlistStrategies[strategy.name]) return console.log('Strategy already exists')
        this.playlistStrategies[strategy.name] = strategy;
    }
    
    removeStrategy(strategy) {
        if (!this.playlistStrategies[strategy.name]) return console.log('Strategy not exist');

        delete this.playlistStrategies[strategy.name];
    }
    
    getStrategies() {
        return Object.values(this.playlistStrategies);
    }
    
    
    addSorter(sorter) {
        sorter.sorts.forEach(s => this.sorts[s.id]? console.log('Already in list'): this.sorts[s.id] = s);
    }

    searchSongs(search) {
        const lowered = search.toLowerCase();
        return Object.values(this.songs).filter(s => s.title.toLowerCase().includes(lowered) || s.artist.toLowerCase().includes(lowered))
    }

    sorter(songs) { // [id]
        const { sort } = queryString.parse(history.location.search);
        return this.sorts[sort] ? this.sorts[sort].sort(songs, this) : songs // [id]
    }

    _collection(name) {
        return name ? this.playlistStrategies[name.toLowerCase()]: this.playlistStrategies[0];
    }

    deleteFromHistory(id) {
        const hList = JSON.parse(localStorage.getItem('_h')) || [];
        if (hList.includes(id)) {
            const idx = hList.indexOf(id);
            if (idx > -1) hList.splice(idx,1);
        }
        localStorage.setItem('_h', JSON.stringify(hList));
    }

    toHistory() {
        const {c,s} = queryString.parse(history.location.search);
        if (c === 'history') return;
        this.deleteFromHistory(s);
        const hList = JSON.parse(localStorage.getItem('_h')) || [];
        hList.unshift(s);
        if (hList.length > Player.HISTORY_SIZE) hList.splice(hList.length - 1, 1)
        localStorage.setItem('_h', JSON.stringify(hList));
    }

    _song(playlist, id) {
        if (!id) {
            const song = this.songs[this.sorter(playlist.songs)[0]]
            if (!song) return null
            song.index = 1
            return song
        }
        if (!playlist.songs.includes(id)) return null
        const song = this.songs[id]
        song.index = this.sorter(playlist.songs).indexOf(id) + 1;
        return song;
    }

    getQueryResult() {
        const {c, p, s} = queryString.parse(history.location.search);
        const collection = this._collection(c) || Object.values(this.playlistStrategies)[0];
        if (!collection) return false;
        const playlist = collection.getPlaylist(p);
        if (!playlist) return false;
        const song = this._song(playlist, s);
        if (!song) return false;

        this._prepareSong(song)

        return {c: collection, p: playlist, s: song};
    }
    
    _prepareSong(song) {
        if (!song.lyrics) getSong(song.id, (s) => {
            song.lyrics = s.lyrics;
            this.refreshComponent()
        });
    }

    getQueryUrl({c, p, s, sort}) {
        const queries = []
        if (c) queries.push(`c=${c.name?c.name.toLowerCase():c}`)
        if (p) queries.push(`p=${p.name?p.name.toLowerCase():p}`)
        if (s) queries.push(`s=${s.id?s.id:s}`)
        if (sort) queries.push('sort=' + sort)
        return `?${queries.join('&')}`
    }

    getSongById(id){
        if (Object.keys(this.songs).length === 0) return null;
        return this.songs[id] ? this.songs[id] : null;
    }

    ////////// WRITE //////////

    next = () => this.songScroll(1)
    prev = () => this.songScroll(- 1)
    rand = () => this.songScroll(0)

    songScroll(count) {
        const {c, p, s} = queryString.parse(history.location.search);
        const songs = this._collection(c).playlists[p].songs;
        const pLen = songs.length;
        if (count === 0) this.setSong(songs[Math.floor(Math.random() * pLen)])
        else this.setSong(this.sorter(songs)[(pLen + songs.indexOf(s) + count) % pLen])
    }
    setSong(s) {
        const {c, p, sort} = queryString.parse(history.location.search);
        history.push('/play/' + this.getQueryUrl({c, p, s, sort}))
    }

    setSongAll(id) {
        history.push('/play/' + this.getQueryUrl({s:id}))
    }

    editSong = ({c, p, s}) => {
        history.push('/play/' + this.getQueryUrl({c, p, s}) + '&edit=true')
    }

    transposeUp = (song) => this.transposeCount(song,1);
    transposeDown = (song) => this.transposeCount(song, -1);

    transposeCount(song, count) {
        if (!song.display) return;
        song.transpose = MusicTheory.keepRangePlusNeg(song.transpose + count);
        // SetTranspose
        song.display = song.display.replace(
            MusicTheory.rexNotes,
            (full, note, ext) => MusicTheory.transposeNote(note, count) + ext
        );
        this.refreshComponent();
    }
}

export default Player;