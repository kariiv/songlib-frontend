export const getNews = (count, cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/news.py" + (count ? `?c=${count}`:''))
        .then(data => data.json())
        .then(json => cb(json));
}

const types = {
    dad_en: 'Dad joke',
    jokes_en: 'Joke',
    quote_en: 'Quote',
    chuck_en: 'Chuck Norris EN',
    chuck_et: 'Chuck Norris EST',
    black_et: 'Mustad',
    puns_en: 'Pun',
}

export const nameConvert = (name) => {
    return types[name] || name
}
