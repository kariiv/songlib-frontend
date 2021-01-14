import Tag from "../object/Tag";
import Provider, { saveAlert } from "./Provider";



export default class TagProvider extends Provider {

    static API = "http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/tags.py"
    static API_SONG_TAGS = "http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/song_tags.py"

    static async getAll() {
        const data = await (await fetch(TagProvider.API)).json()
        return Object.entries(data).map(([key, value]) => new Tag({id:key, name:value}))
    }

    static async create(tag) {
        return super.create(TagProvider.API, tag, Tag)
    }

    static async edit(tag) {
        return await TagProvider.create(tag)
    }

    static async delete(id) {
        return super.delete(id, TagProvider.API)
    }

    static async saveSongTags(tag) {
        console.log(tag)
        const form = new FormData();
        form.append('id', tag.getId())
        form.append('songs', JSON.stringify(tag.getSongs().map(song => song.getId())))

        console.log(form.get("songs"))

        return await saveAlert(TagProvider.API_SONG_TAGS, form)
    }
}



