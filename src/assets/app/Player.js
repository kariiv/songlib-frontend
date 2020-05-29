import SongBuilder from './Songbuilder';
import MusicTheory from './MusicTheory';

import { getAllSongs, getSong } from '../../actions/songs';
import { getAllTags } from '../../actions/tags';
import history from '../../history';
import queryString from 'query-string';

import {
    AllStrategy,
    // LatestStrategy,
    ArtistStrategy,
    TagStrategy,
    LinkStrategy,
    // RankStrategy,
    // CollectionStrategy
} from './playlist/PlaylistStrategy';

class Player {

    // Song = {id:'', link:'', title:'', artist:'', tags:[], rank:0, transpose:0, lyrics:'', display:'', time:0};

    constructor(component) {
        this.component = component;

        this.songs = {};
        this.tags = {};
        this.collections = {};
        this.playlistStrategies = {};

        this.history = localStorage.getItem('_h') || []   // [id]
        this.fullLyrics = true;
        this.loaded = false;

        getAllSongs((songs) => {
            this._songsToDict(songs)

            this.addStrategy(new AllStrategy(this))
            this.addStrategy(new ArtistStrategy(this,4))

            getAllTags((tags) => {
                this.tags = tags;
                this.loaded = true;

                this.addStrategy(new TagStrategy(this, 5))
                this.addStrategy(new LinkStrategy(this))

                this.refreshComponent();
            });
        });
    }
    _songsToDict = (songs) => songs.forEach(s => this.songs[s.id] = s)

    refreshComponent = () => this.component.setState({player: this})

    reloadLibrary() {
        getAllSongs((songs) => {
            this._songsToDict(songs)
            this.refreshComponent();
        });
    }
    reloadTags() {
        getAllTags((tags) => {
            this.tags = tags;
            this.refreshComponent();
        });
    }

    addStrategy(strategy) {
        if (this.playlistStrategies[strategy.name]) throw new Error('Strategy already exists');
        this.playlistStrategies[strategy.name] = strategy;
    }

    sorter(songs) {
        // Todo Sorters
        return songs;
    }

    _collection(name) {
        return name ? this.playlistStrategies[name.toLowerCase()]: this.playlistStrategies[0];
    }

    _song(playlist, id) {
        if (!id) {
            const song = this.songs[playlist.songs[0]]
            song.index = 1
            return song
        }
        if (!playlist.songs.includes(id)) return null
        const song = this.songs[id]
        // console.log(playlist.songs)
        // console.log(this.sorter(playlist.songs))
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
        if (song.link) song.link = Player.getYoutubeEmbed(song.link);
        if (song.transpose === undefined) song.transpose = 0;

        if (!song.lyrics) getSong(song.id, (s) => {
            song.lyrics = s.lyrics;
            this._lyricsBuild(song);
            this.refreshComponent()
        });
    }
    static getYoutubeEmbed(url) {
        return url.replace("watch?v=", "embed/") + "?rel=0&modestbranding=1&autohide=1&showinfo=0&playsinline=1";
    }
    _lyricsBuild(song) {
        song.display = this.fullLyrics ? SongBuilder.getFullLyrics(song.lyrics) : SongBuilder.getOriginalLyrics(song.lyrics);
    }

    getQueryUrl({c, p, s}) {
        return `?c=${c.name?c.name.toLowerCase():c}&p=${p.name?p.name.toLowerCase():p}&s=${s.id?s.id:s}`
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
        const {c, p} = queryString.parse(history.location.search);
        history.push('/play/' + this.getQueryUrl({c, p, s}))
    }

    editSong = ({c, p, s}) => {
        history.push('/play/' + this.getQueryUrl({c, p, s}) + '&edit=true')
    }

    transposeUp = (song) => this.transposeCount(song,1);
    transposeDown = (song) => this.transposeCount(song, -1);

    transposeCount(song, count) {
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