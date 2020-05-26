export const getAllSongs = (cb) => {
    if (!cb) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/songs.py") // id, tags, title, artist, updated,
        .then(data => data.json())
        .then(json => cb(json));
}

export const getSong = (id, cb) => {
    if (!cb || !id) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/songs.py?id="+id)
        .then(data => data.json())
        .then(json => cb(json));
}

export const createSong = (id, cb) => {
    if (!cb || !id) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/songs.py?id="+id)
        .then(data => data.json())
        .then(json => cb(json));
}

export const editSong = (id, cb) => {
    if (!cb || !id) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/songs.py?id="+id)
        .then(data => data.json())
        .then(json => cb(json));
}

export const rateSongDifficulty = (id, cb) => {
    if (!cb || !id) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/songs.py?id="+id)
        .then(data => data.json())
        .then(json => cb(json));
}