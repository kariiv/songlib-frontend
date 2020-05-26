export const createMessage = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const getMessages = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const deleteMessage = (id, cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}
export const markAsSeen = (id, cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}