export const createCollection = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const addToCollection = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const removeFromCollection = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}
export const deleteCollection = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}