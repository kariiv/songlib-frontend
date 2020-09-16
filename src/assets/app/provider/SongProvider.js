import login from "./login";
import Swal from "sweetalert2";
import Song from '../Song';

const alertSaveSongSettings = {
    title: 'Save song?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#1cc88a',
    cancelButtonColor: '#e74a3b',
    confirmButtonText: 'Save'
}
const alertSaveSuccess = {
    icon: 'success',
    title: 'Saved!',
    text: 'Your song has been saved',
    showConfirmButton: false,
    timer: 1200,
}
const alertSaveError = {
    icon: 'error',
    title: 'Not saved!',
    showConfirmButton: false,
    timer: 1500,
}

const alertDeleteSongSettings = {
    title: 'Delete song?',
    text: 'You wont be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74a3b',
    cancelButtonColor: '#4e73df',
    confirmButtonText: 'Delete'
}
const alertDeleteSuccess = {
    icon: 'success',
    title: 'Deleted!',
    text: 'Your song has been deleted',
    showConfirmButton: false,
    timer: 1200,
}
const alertDeleteError = {
    icon: 'error',
    title: 'Not deleted!',
    showConfirmButton: false,
    timer: 1500,
}


export default class SongProvider {

    static async getAllSongs() {
        return await (await fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/get_songs.py")).json();
    }
    
    static async getLyrics(id) {
        return await (await fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/get_songs.py?id="+id)).text();
    }

    static async saveSong(song) {
        if (!(song instanceof Song))
            throw new Error('Input must be class of Song')
        const form = new FormData();
        for (const [key, value] of Object.entries(song.getObject())) 
            form.append(key, value);
        
        const resAlert = await Swal.fire(alertSaveSongSettings);
        return resAlert.value && await saveSongAlert(form, alertSaveSuccess, alertSaveError);
    }
    
    static async deleteSong(id) {
        const form = new FormData();
        form.append('id', id)
        
        const resAlert = await Swal.fire(alertDeleteSongSettings)
        return resAlert.value && await saveSongAlert(form, alertDeleteSuccess, alertDeleteError);
    }
        
}

const saveSongAlert = async (form, success, error) => {
    const err = await saveSong(formData)
    if (result === null) return false;
    
    if (err) {
        error.text = result
        Swal.fire(error)
    } else Swal.fire(success)
    
    return !!!err
}

const saveSong = async (form) => {
    const pass = await login()
    if (pass === null) return null;
    
    form.append('pass', pass)
    try {
        const res = await fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/save_song.py", {method: 'POST', body: form})
    } catch(err) {
        return err.toString();
    }
}  