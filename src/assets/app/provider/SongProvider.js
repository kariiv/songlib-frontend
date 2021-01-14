import Song from '../object/Song';
import Provider from "./Provider";


export default class SongProvider extends Provider {

    static GET = 'http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/get_songs.py'
    static SAVE = 'http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/save_song.py'

    static async getAll() {
        return super.getAll(SongProvider.GET, Song)
    }

    static async create(song) {
        return await super.create(SongProvider.SAVE, song, Song)
    }

    static async edit(song) {
        return await SongProvider.create(song)
    }
    
    static async delete(id) {
        return super.delete(id, SongProvider.SAVE)
    }

    static async getLyrics(id) {
        return JSON.parse(await (await fetch(SongProvider.GET + "?id="+id)).text()).lyrics;
    }
}