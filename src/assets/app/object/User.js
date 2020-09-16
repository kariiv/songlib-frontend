
export default class User {

    constructor({id, display, created_at, pic}) {
        this.id = id;
        this.display = display;
        this.createdAt = created_at;
        this.pic = pic;
        
        this.songs = []
    }
    
    follow(who) {
        if (who.id === this.id) throw new Error('Cant follow yourselt');
        
    }
    
    unfollow(who) {
        if (who.id === this.id) throw new Error('Cant unfollow yourselt');
        
    }
    
    getSongs() {
        
    }
    
    getTags() {
        
    }
    
    
    
}