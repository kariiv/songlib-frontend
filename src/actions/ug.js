import Swal from "sweetalert2";

export const getUGData = (cb) => {
    if (!cb) return;
    Swal.fire({
        title: 'Ultimate guitar URL',
        icon: 'question',
        input: 'text',
        showCancelButton: true,
        confirmButtonColor: '#1cc88a',
        cancelButtonColor: '#e74a3b',
        confirmButtonText: 'Get'
    }).then((result) => {
        if (result.value) {
            fetch("http://dijkstra.cs.ttu.ee/~kariiv/cgi-bin/music/ug.py?ug="+result.value) // id, tags, title, artist, updated,
                .then(data => data.json())
                .then(json => cb(json))
        }
    })
}