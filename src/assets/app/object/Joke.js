const types = {
    dad_en: 'Dad joke',
    jokes_en: 'Joke',
    quote_en: 'Quote',
    chuck_en: 'Chuck Norris EN',
    chuck_et: 'Chuck Norris EST',
    black_et: 'Mustad',
    puns_en: 'Pun',
}

export default class Joke {

    constructor({n, q, a}) {
        if (!(n in types))
            throw new TypeError("Unknown type")
        this.type = n
        this.question = q
        this.answer = a
    }

    getType() {
        return types[this.type] || this.type
    }

    getQuestion() {
        return this.question
    }

    getAnswer() {
        return this.answer;
    }
}