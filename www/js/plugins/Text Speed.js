(function() {

    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.call(this);
        this.addCommand("Text Speed", "textSpeed");
    };

    Window_Options.prototype.getConfigValue = function(symbol) {
        if (symbol === "textSpeed") {
            if ($gameSystem._messageSpeed === undefined) $gameSystem._messageSpeed = 1;
            return $gameSystem._messageSpeed;
        }
        return ConfigManager[symbol];
    };

    Window_Options.prototype.setConfigValue = function(symbol, value) {
        if (symbol === "textSpeed") {
            $gameSystem._messageSpeed = value;
            return;
        }
        ConfigManager[symbol] = value;
    };
    Window_Options.prototype.statusText = function(symbol) {
        if (symbol === "textSpeed") {
            return String(this.getConfigValue(symbol));
        }
        return ConfigManager[symbol] ? "ON" : "OFF";
    };

    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        if (this.currentSymbol() === "textSpeed") {
            SoundManager.playCursor();
            this.changeTextSpeed(-1);
            return;
        }
        _Window_Options_cursorLeft.call(this, wrap);
    };

    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        if (this.currentSymbol() === "textSpeed") {
            SoundManager.playCursor();
            this.changeTextSpeed(1);
            return;
        }
        _Window_Options_cursorRight.call(this, wrap);
    };

    Window_Options.prototype.changeTextSpeed = function(amount) {
        let val = this.getConfigValue("textSpeed");
        val += amount;
        if (val < 0) val = 0;
        if (val > 4) val = 4;
        this.setConfigValue("textSpeed", val);
        this.redrawItem(this.findSymbol("textSpeed"));
    };

})();