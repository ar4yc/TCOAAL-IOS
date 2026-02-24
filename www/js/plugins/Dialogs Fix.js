(function() {

const _add = Game_Message.prototype.add;

Game_Message.prototype.add = function(text) {

    if (text && window.LANGDATA) {
        text = String(text);

        text = text.replace(/\(label\)\[(.*?)\]/g, function(_, key) {
            var name = (LANGDATA.labelLUT && LANGDATA.labelLUT[key]) || "";
            name = String(name || "");
            name = name.replace(/,{2,}/g, ",");
            return name ? "<center>" + name + "</center>\n" : "";
        });

        text = text.replace(/\(lines\)\[(.*?)\]/g, function(_, key) {

            var str =
                (LANGDATA.lines && LANGDATA.lines[key]) ||
                (LANGDATA.linesLUT && LANGDATA.linesLUT[key]) ||
                (LANGDATA.dialogue && LANGDATA.dialogue[key]) ||
                (LANGDATA.text && LANGDATA.text[key]) ||
                "";

            str = String(str || "");

            str = str.replace(/^,/, "").trimStart();
            str = str.replace(/,{2,}/g, ",");

            if (/^Got a/i.test(str)) {
                str = "\n" + str;
            }

            return "<center>" + str + "</center>";
        });
    }

    _add.call(this, text);
};

})();
