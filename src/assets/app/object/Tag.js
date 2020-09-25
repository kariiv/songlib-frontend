export default class Tag {

    constructor({user_id, user_display, name, created_at}) {
        this.userId = user_id;
        this.userDisplay = user_display;
        this.name = name;
        this.createdAt = created_at;
        
        this.songs = []
    }
    
    getSongs() {
        return
    }

    addSong(song) {
        if (this.songs.find(s => s.id === song.id)) return console.log('Song already listed')
        this.songs.push(song);
    }
}