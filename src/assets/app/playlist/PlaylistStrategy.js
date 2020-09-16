class PlaylistStrategy  {
    constructor(player, name, icon, MIN_PLAYLIST_SIZE) {
        if (!player) throw new Error('No player included');
        this.player = player
        this.name = name.toLowerCase();
        this.icon = icon;
        this.MIN = MIN_PLAYLIST_SIZE;
        if (!this.playlists) this.playlists = {}
        this.makePlaylists()
    }

    makePlaylists() { // [ {name, [songs]}, ... ]
        throw new Error('Playlist function not implemented!')
    }

    getPlaylist(name) {
        return name ? this.playlists[name.toLowerCase()] : Object.values(this.playlists)[0];
    }

    setMinSize(val) {
        this.MIN = val;
        this.makePlaylists();
        this.player.refreshComponent();
    }
}

export default PlaylistStrategy;

export class AllStrategy extends PlaylistStrategy  {
    constructor(player) {
        super(player, 'All','fa-music', 0)
    }

    makePlaylists() {
        if (!this.player.songs) throw new Error('No songs at player');
        this.playlists = {
            'all' : {name:'All', songs: this.player.getSongs() }
        }
    }
}


export class ArtistStrategy extends PlaylistStrategy  {
    constructor(player, MIN_PLAYLIST_SIZE) {
        super(player,'Artist', 'fa-microphone', MIN_PLAYLIST_SIZE)
    }

    makePlaylists() {
        if (!this.player.songs) throw new Error('No songs included');

        this.playlists = {}
        const songlist = this.player.getSongs()
        for (let song of songlist) {
            const artist = song.artist.trim();
            if (this.playlists[artist]) continue;
            const songs = songlist.filter(s => s.artist.trim() === artist).map(s => s.id)
            if (songs.length >= this.MIN) this.playlists[artist.toLowerCase()] = { name: artist, songs }
        }
    }
}


export class TagStrategy extends PlaylistStrategy  {
    constructor(player,MIN_PLAYLIST_SIZE) {
        super(player,'Tag','fa-tags', MIN_PLAYLIST_SIZE)
    }

    makePlaylists() {
        if (!this.player.tags) throw new Error('No tags included');
        if (!this.player.songs) throw new Error('No songs included');
        this.playlists = {}

        const songlist = this.player.getSongs()
        for (let tag of Object.keys(this.player.tags)) {
            const tagNr = parseInt(tag);
            let songs = songlist.filter(s => s.tags.includes(tagNr)).map(s => s.id);
            if (songs.length >= this.MIN) this.playlists[this.player.tags[tag].toLowerCase()] = { name: this.player.tags[tag], songs }
        }
    }
}

export class LinkStrategy extends PlaylistStrategy  {
    constructor(player) {
        super(player,'Link','fa-link', 0)
    }

    makePlaylists() {
        if (!this.player.songs) throw new Error('No songs included');

        const songlist = this.player.getSongs();
        this.playlists = {
            'linked' : { name: 'Linked', songs: songlist.filter(s => !!s.link).map(s => s.id)},
            'unlinked': { name: 'Unlinked', songs: songlist.filter(s => !!!s.link).map(s => s.id)}
        }
    }
}

export const rankRange = {
    0: "Unk",
    1: 'Learning',
    2: 'Play',
    3: 'Sing',
    4: 'PlaySing'
}


export class RankStrategy extends PlaylistStrategy  {
    constructor(player) {
        super(player, 'Difficulty', 'fa-graduation-cap', 0)
    }

    makePlaylists() {
        if (!this.player.songs) throw new Error('No songs included');
        this.playlists = {}

        const songlist = this.player.getSongs()
        for (const n of Object.keys(rankRange)) {
            const nr = parseInt(n)
            let songs = songlist.filter(s => s.rank === nr).map(s => s.id);
            if (songs.length >= this.MIN) this.playlists[rankRange[n].toLowerCase()] = { name: rankRange[n], songs }
        }
    }
}

export class HistoryStrategy extends PlaylistStrategy  {
    constructor(player) {
        super(player,'History','fa-history', 0)
    }

    get playlists() {
        const hList = JSON.parse(localStorage.getItem('_h') || '[]')
        return { 'history': {name: this.name, songs: hList.filter((v,i) => hList.indexOf(v) === i) } }
    }
    makePlaylists() {}
}


export class LangStrategy extends PlaylistStrategy  {
    constructor(player, MIN_PLAYLIST_SIZE) {
        super(player,'Lang', 'fa-microphone', MIN_PLAYLIST_SIZE)
    }

    makePlaylists() {
        if (!this.player.songs) throw new Error('No songs included');

        this.playlists = {}
        const songlist = this.player.getSongs()
        for (let song of songlist) {
            const artist = song.artist.trim();
            if (this.playlists[artist]) continue;
            const songs = songlist.filter(s => s.artist.trim() === artist).map(s => s.id)
            if (songs.length >= this.MIN) this.playlists[artist.toLowerCase()] = { name: artist, songs }
        }
    }
}


// export class LatestStrategy extends PlaylistStrategy  {
//     constructor(player) {
//         super(player,'Latest','fa-upload', 0)
//     }
//
//     getPlaylists() {
//         if (!this.player.songs) throw new Error('No songs included');
//         return [
//             {name:'Newer', songs: Array.prototype.slice.call(this.player.songs).sort((a,b) => b.time - a.time).map(s => s.index) },
//             {name:'Older', songs: Array.prototype.slice.call(this.player.songs).sort((a,b) => a.time - b.time).map(s => s.index) },
//         ]
//     }
// }

