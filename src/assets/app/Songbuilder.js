export default class SongBuilder {
    static getFullLyrics(text) {
        const regex = /(\[[^\]]+])([ ]?(\d)x)?(((?!\[|\n{2})(.|\n))+)?/gm;

        const mapping = {};
        const rexed = text.replace(regex, function(full, title, $0, number, text) {
            let count = 1;
            title = title.trim();
            if (number) count = parseInt(number);

            if (text && text.trim()) {
                if (text[0] === "\n") text = text.substr(1);
                if (!mapping[title]) {
                    mapping[title] = text;
                    return SongBuilder.assembleSection(title, text, count);
                }
                return SongBuilder.assembleSection(
                    title,
                    mapping[title] + "\n" + text,
                    count
                );
            } else {
                if (!mapping[title]) return title;
                return SongBuilder.assembleSection(title, mapping[title], count);
            }
        });
        return rexed
            .replace(/(\n{3,})/g, "\n\n")
            .replace(/^(\s*\n)+|(\s|\n)+$/g, "");
    }

    static assembleSection(title, text, count) {
        text = text.replace(/^(\s*\n)+|(\s|\n)+$/g, "");
        for (let i = 0; i < count; i++) title = "\n" + title + "\n" + text + "\n";

        return title;
    }

    static getOriginalLyrics(text) {
        return text
            .replace(/(\n{3,})/g, "\n\n")
            .replace(/^(\s*\n)+|(\s|\n)+$/g, "");
    }
}