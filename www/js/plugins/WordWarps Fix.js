(function() {

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.call(this, text);
        return this.safeWordWrap(text);
    };

    Window_Base.prototype.safeWordWrap = function(text) {
        if (!text) return text;

        const maxWidth = this.contentsWidth();
        const lines = [];
        const paragraphs = text.split('\n');

        paragraphs.forEach(paragraph => {
            let line = '';
            const words = paragraph.split(/(\s+)/);

            words.forEach(word => {
                let testLine = line + word;
                let width = this.textWidth(testLine);

                if (width > maxWidth) {
                    if (line) lines.push(line);

                    if (this.textWidth(word) > maxWidth) {
                        let splitWord = '';
                        for (let char of word) {
                            const testWord = splitWord + char;
                            if (this.textWidth(testWord) > maxWidth) {
                                if (splitWord) lines.push(splitWord);
                                splitWord = char;
                            } else {
                                splitWord = testWord;
                            }
                        }
                        line = splitWord;
                    } else {
                        line = word.trimStart();
                    }
                } else {
                    line = testLine;
                }
            });

            if (line) lines.push(line);
        });

        return lines.join('\n');
    };

})();