import Provider from "./Provider";
import Joke from "../object/Joke";

export default class JokeProvider extends Provider {

    static API = 'http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/news.py'

    static async getAll() {
        return super.getAll(JokeProvider.API, Joke)
    }

    static async getSome(count) {
        return super.getAll(JokeProvider.API + (count ? `?c=${count}`:''), Joke)
    }
}