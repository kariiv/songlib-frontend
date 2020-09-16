export default class MusicTheory {
    static prefix = "\\b";
    static extensions = "(m|5|7|9|m7|m9|m6|sus2|sus4)\\b";
    static suffix = "(?=\\s|\\)|\\/|$)";
    static noteArrayAll = ["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"];
    static noteArrayH = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    static noteArrayL = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    static rexNotes = new RegExp(`${this.prefix}(${this.noteArrayAll.join("|")})(${this.extensions}|${this.suffix})`, "gm");
    static prefLink = [10];
    
    static transposeLyrics(lyrics, count) {
        return count === 0 ? lyrics : lyrics.replace(
            MusicTheory.rexNotes,
            (full, note, ext) => MusicTheory.transposeNote(note, count) + ext
        );
    }

    static transposeNote(note, count) {
        const _note = note.trim();
        let index;
        if (MusicTheory.noteArrayH.includes(_note)) index = MusicTheory.noteArrayH.indexOf(_note);
        else index = MusicTheory.noteArrayL.indexOf(_note);
        return MusicTheory.getNote(index + count);
    }

    static getNote(note) {
        const _note = MusicTheory.keepRange(note);
        return MusicTheory.prefLink.includes(_note) ? MusicTheory.noteArrayL[_note] : MusicTheory.noteArrayH[_note];
    }

    static keepRange(index) {
        return index >= 0 ? index % 12 : (12 - (Math.abs(index) % 12)) % 12;
    }

    static keepRangePlusNeg(index) {
        return index >= 0 ? index % 12 : -(Math.abs(index) % 12);
    }
}