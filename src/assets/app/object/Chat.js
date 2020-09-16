export default class Chat {

    constructor({id, name, created_at}) {
        this.id = id;
        this.name = name;
        this.createdAt = created_at;
        this.messages = [];
    }
    
    sendMessage() {
    
        return true;
    }
    
    deleteMessage() {
        
    }
    
    addMessages() {
        
    }
    
    loadMessages(count) {
        const c = count || 10;
        const s = this.messages.lenght
        
        
        
    }
    
}