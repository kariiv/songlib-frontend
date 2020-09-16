import login from "./login";
import Swal from "sweetalert2";

export const getAllSongs = async () => {
    return await (await fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/get_songs.py")).json();
}

export const getSong = async (id) => {
    return await (await fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/get_songs.py?id="+id)).json();
}

export const deleteSong = (id, successCallback) => {
    const formData = new FormData();
    formData.append('id', id)
    Swal.fire({
        title: 'Delete song?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74a3b',
        cancelButtonColor: '#4e73df',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.value) {
            save_song(formData, (result) => {
                console.log(result);
                if (result.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Not deleted!',
                        text: 'Something went wrong!',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else {
                    if (successCallback) successCallback()
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your song has been deleted',
                        showConfirmButton: false,
                        timer: 1200,
                    })
                }
            })
        }
    })
}

export const saveSong = (data, successCallback) => {
    const { id, title, artist, tags, link, lyrics, rank } = data;
    const formData = new FormData();
    formData.append('id', id)
    formData.append('artist', artist)
    formData.append('title', title)
    formData.append('tags', tags)
    formData.append('link', link)
    formData.append('lyrics', lyrics)
    formData.append('rank', rank)

    Swal.fire({
        title: 'Save song?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#e74a3b',
        confirmButtonText: 'Save'
    }).then((result) => {
        if (result.value) {
            save_song(formData, (result) => {
                console.log(result)
                if (result.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Not saved!',
                        text: result.error,
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved!',
                        text: 'Your song has been saved',
                        showConfirmButton: false,
                        timer: 1200,
                    })
                    if (successCallback) successCallback(result.data)
                }
            })
        }
    })
}

const save_song = (form, cb) => {
    login((pass) => {
        form.append('pass', pass)
        fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/save_song.py",
            {method: 'POST', body: form})
            .then((res) => res.json())
            .then(json => cb? cb(json): null)
            .catch(err => cb? cb({error: err.toString()}): null);
    })
}

export const rateSongDifficulty = (id, cb) => {
    if (!cb || !id) return;
    fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/songs.py?id="+id)
        .then(data => data.json())
        .then(json => cb(json));
}