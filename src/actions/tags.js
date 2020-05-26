export const getAllTags = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const createTag = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const renameTag = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/tags.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}