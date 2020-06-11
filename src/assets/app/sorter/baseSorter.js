
class BaseSorter {
    constructor() {
        // if (!this.getSort) throw new Error('No sort implemented');
        this.sorts = [
            {
                id: "artist_asc",
                name: "Artist asc",
                sort: (list, player) => list.sort((a, b) => player.songs[a].artist.localeCompare(player.songs[b].artist))
            },
            {
                id: "artist_desc",
                name: "Artist desc",
                sort: (list, player) => list.sort((a, b) => player.songs[b].artist.localeCompare(player.songs[a].artist))
            },
            {
                id: "title_asc",
                name: "Title asc",
                sort: (list, player) => list.sort((a, b) => player.songs[a].title.localeCompare(player.songs[b].title))
            },
            {
                id: "title_desc",
                name: "Title desc",
                sort: (list, player) => list.sort((a, b) => player.songs[b].title.localeCompare(player.songs[a].title))
            },
            {
                id: "time_asc",
                name: "Latest first",
                sort: (list, player) => list.sort((a, b) => player.songs[a].time - player.songs[b].time)
            },
            {
                id: "time_desc",
                name: "Oldest first",
                sort: (list, player) => list.sort((a, b) => player.songs[b].time - player.songs[a].time)
            },
            {
                id: "rank_asc",
                name: "Easy first",
                sort: (list, player) => list.sort((a, b) => player.songs[b].rank - player.songs[a].rank)
            },
            {
                id: "rank_desc",
                name: "Hard first",
                sort: (list, player) => list.sort((a, b) => player.songs[a].rank - player.songs[b].rank)
            }
        ]
    }

}

export default BaseSorter;


export class ArtistSorter extends BaseSorter {

}

export class TitleSorter extends BaseSorter {

}

export class TimeSorter extends BaseSorter {

}

export class RankSorter extends BaseSorter {

}

export class WordCountSorter extends BaseSorter { // Future

}

