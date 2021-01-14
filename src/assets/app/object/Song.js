import MusicTheory from "../MusicTheory";
import SongProvider from "../provider/SongProvider";
import DBObject from "./DBObject";

export default class Song extends DBObject {

    static LINK_RE = new RegExp('(^|(?<=/|=))[a-zA-Z0-9-_]{7,15}(?=$|\\?|")')

    constructor({id = '', title = '', artist = '', rank = 0, link = '', tags = [], lyrics = '', lang='', time= 0}) {
        super(SongProvider, id)
        this.title = title;
        this.artist = artist;
        this.lyrics = lyrics;
        this.rank = rank;
        this.link = link;
        this.link = this.getLink()
        this.lang = lang;
        this.time = time;
        this.tags = tags;

        this._transpose = 0;


        this._tags = []
    }

    async loadLyrics() {
        this.lyrics = await SongProvider.getLyrics(this.id)
    }

    display(full = true) {
        return MusicTheory.transposeLyrics(full ? Song.getFullLyrics(this.lyrics) : Song.getOriginalLyrics(this.lyrics), this._transpose);
    }

    getTransposition() {
        return this._transpose
    }
    transpose(count) {
        this._transpose = MusicTheory.keepRangePlusNeg(this._transpose + count);
    }

    getTags() {
        return this._tags
    }
    addTag(tag) {
        if (this._tags.indexOf(tag) !== -1) return
        this._tags.push(tag);
        tag.addSong(this);
    }
    removeTag(tag) {
        const index = this._tags.indexOf(tag)
        if (index === -1) return
        this._tags.splice(index, 1);
        tag.removeSong(this)
    }
    getLink() {
        return Song.getYoutubeEmbed(this.link);
    }

    getObject() {
        const obj = {}
        if (this.id) obj["id"] = this.id
        if (this.title) obj["title"] = this.title
        if (this.artist) obj["artist"] = this.artist
        if (this.lyrics) obj["lyrics"] = this.lyrics
        if (this.rank) obj["rank"] = this.rank
        if (this.link) obj["link"] = this.getLink()
        if (this.tags) obj["tags"] = this.tags.join(' ')
        if (this.lang) obj["lang"] = this.lang
        if (this.createdAt) obj["time"] = this.createdAt

        return obj
    }

    static getYoutubeEmbed(url) {
        if (!url) return ''
        try {
            const id = Song.LINK_RE.exec(url)[0]
            return "https://youtube.com/embed/" + id;
        } catch (e) {
            console.error(e)
            return ''
        }
    }

    static getFullLyrics(text) {
        const regex = /(\[[^\]]+])([ ]?(\d)x)?(((?!\[|\n{2})(.|\n))+)?/gm;

        const mapping = {};
        const replaced = text.replace(regex, function(full, title, $0, number, text) {
            let count = 1;
            title = title.trim();
            if (number) count = parseInt(number);

            if (text && text.trim()) {
                if (text[0] === "\n") text = text.substr(1);
                if (!mapping[title]) {
                    mapping[title] = text;
                    return Song.assembleSection(title, text, count);
                }
                return Song.assembleSection(
                    title,
                    mapping[title] + "\n" + text,
                    count
                );
            } else {
                if (!mapping[title]) return title;
                return Song.assembleSection(title, mapping[title], count);
            }
        });
        return replaced
            .replace(/(\n{3,})/g, "\n\n")
            .replace(/^(\s*\n)+|(\s|\n)+$/g, "");
    }

    static assembleSection(title, text, count) {
        text = text.replace(/^(\s*\n)+|(\s|\n)+$/g, "");
        for (let i = 0; i < count; i++) title = "\n" + title + "\n" + text + "\n";

        return title;
    }

    static getOriginalLyrics(text) {
        return text
            .replace(/(\n{3,})/g, "\n\n")
            .replace(/^(\s*\n)+|(\s|\n)+$/g, "");
    }
}