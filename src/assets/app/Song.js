import SongBuilder from './Songbuilder';
import MusicTheory from './MusicTheory';

export default class Song {

    constructor({id, title, artist, rank = 0, link = '', tags = [], lyrics, lang='en', key=0, capo=0, bpm=0, user, pattern, createdAt}) {
        if (!id || !title || !artist || !lyrics) 
            throw new Error('Required field missing');
        if (key < 0 || key > 11)
            throw new Error('Key is out of octave');
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.lyrics = lyrics;
        this.rank = rank;
        this.link = Song.getYoutubeEmbed(link);
        this.key = key;
        this.capo = capo;
        this.bpm = bpm;
        this.pattern = pattern;
        this.lang = lang;
        
        this.user = user;
        this.tags = tags;
        this.transpose = 0;
    }
    
    get display() {
        const fullLyrics = true;
        return MusicTheory.transposeLyrics(fullLyrics ? SongBuilder.getFullLyrics(this.lyrics) : SongBuilder.getOriginalLyrics(this.lyrics), this.transpose);
    }
    
    transpose(count) {
        this.transpose = MusicTheory.keepRangePlusNeg(this.transpose + count);
        
        this.refreshComponent();
    }
    
    getObject() {
        return {
            id: this.id,
            title: this.title,
            artist: this.artist,
            lyrics: this.lyrics,
            tags: this.tags,
            rank: this.rank,
            link: this.link,
            key: this.key,
            lang: this.lang,
        }
    }
    
    static getYoutubeEmbed(url) {
        return url.replace("watch?v=", "embed/") + "?rel=0&modestbranding=1&autohide=1&showinfo=0&playsinline=1";
    }
}