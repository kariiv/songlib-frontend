
export default class User {

    constructor({id, display, created_at, logo, email, me=false}) {
        this.id = id;
        this.display = display;
        this.email = email;
        this.createdAt = created_at;
        this.logo = logo;
        this.me = me;

        this.songs = []
        this.friends = []
        this.follows = []
        this.tags = []
    }
    
    follow(who) {
        if (who.me) throw new Error('Cant follow yourselt');
        
    }
    
    unfollow(who) {
        if (who.me) throw new Error('Cant unfollow yourselt');
        
    }

    addFriend() {

    }

    addFollow() {

    }

    addTag() {

    }

    addSong() {

    }

    getFriends() {
        return this.friends;
    }

    getFriends() {
        return this.friends;
    }
    
    getSongs() {
        return this.songs;
    }
    
    getTags() {
        return this.tags;
    }
}