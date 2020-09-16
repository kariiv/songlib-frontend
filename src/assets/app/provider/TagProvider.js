export const getAllTags = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/tags.py")
        .then(data => data.json())
        .then(json => cb(json));
}

export const createTag = (name, cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/tags.py?name=" + name)
        .then(data => data.json())
        .then(json => cb(json));
}

export const renameTag = (id, name, cb) => {
    if (!cb) return;
    fetch(`http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/tags.py?id=${id}&name=${name}`)
        .then(data => data.json())
        .then(json => cb(json));
}

export const removeTag = (id, cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/tags.py?id=" + id)
        .then(data => data.json())
        .then(json => cb(json));
}