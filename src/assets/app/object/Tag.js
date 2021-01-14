import TagProvider from "../provider/TagProvider";
import DBObject from "./DBObject";

export default class Tag extends DBObject {


    constructor({id, name}) {
        super(TagProvider, id)
        this.name = name;
        this.createdAt = 0;

        this.songs = []
    }

    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getSongs() {
        return this.songs;
    }

    addSong(song) {
        if (this.songs.indexOf(song) !== -1) return
        this.songs.push(song);
        song.addTag(this)
    }
    removeSong(song) {
        const index = this.songs.indexOf(song)
        if (index === -1) return
        this.songs.splice(index, 1);
        song.removeTag(this)
    }


    getObject() {
        const obj = {}
        obj["id"] = this.id
        obj["name"] = this.name
        obj["createdAt"] = this.createdAt

        return obj
    }
}