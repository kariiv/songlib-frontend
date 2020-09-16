

export default class Tag {

    constructor({id, name}) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.ownerId = ownerId;
        this.songs = [];
    }
    
    addSong(song) {
        if (this.songs.find(s => s.id === song.id)) return console.log('Song already listed')
        this.songs.push(song);
    }
    
}