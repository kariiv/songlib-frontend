class DBObjectError extends Error {
    constructor(message) {
        super(message);
        this.name = "ProviderError";
    }
}

export default class DBObject {

    constructor(provider, id) {
        this.provider = provider
        this.id = id
    }

    async save() {
        if (this.id) return await this.provider.edit(this)
        else return await this.provider.create(this)
    }

    getId() {
        return this.id;
    }

    getObject() {
        throw new DBObjectError("Method not implemented")
    }
}