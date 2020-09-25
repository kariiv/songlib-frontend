export default class Song {

    constructor({id, artist, title, created_at}) {
        this.id = id;
        this.artist = artist;
        this.title = title;
        this.createdAt = created_at;
        this.sheets = [];
    }
    
    getAllSheets() {
        return []
    }
    
    getLyrics(variant) {
        
    }


}