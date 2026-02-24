(function() {
    window.LANGUAGE_FILES = ["translate.cld", "other.cld"];
    window.LANGUAGE_ENABLED = {};

    window.LANGUAGE_FILES.forEach(f => { window.LANGUAGE_ENABLED[f] = false; });

    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        _Window_MenuCommand_addOriginalCommands.call(this);
        this.addCommand("Languages", "language_menu");
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler("language_menu", this.commandLanguageMenu.bind(this));
    };

    Scene_Menu.prototype.commandLanguageMenu = function() {
        SceneManager.push(Scene_Languages);
    };

    function Scene_Languages() { this.initialize.apply(this, arguments); }
    Scene_Languages.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Languages.prototype.constructor = Scene_Languages;

    Scene_Languages.prototype.initialize = function() { Scene_MenuBase.prototype.initialize.call(this); };
    Scene_Languages.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createWindow();
    };

    Scene_Languages.prototype.createWindow = function() {
        this._window = new Window_Languages(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this.addWindow(this._window);
    };

    function Window_Languages(x, y, w, h) {
        this.initialize.apply(this, arguments);
    }
    Window_Languages.prototype = Object.create(Window_Selectable.prototype);
    Window_Languages.prototype.constructor = Window_Languages;

    Window_Languages.prototype.initialize = function(x, y, w, h) {
        Window_Selectable.prototype.initialize.call(this, x, y, w, h);
        this.refresh();
        this.activate();
        this.select(0);
    };

    Window_Languages.prototype.maxItems = function() { return window.LANGUAGE_FILES.length; };

    Window_Languages.prototype.item = function(index) { return window.LANGUAGE_FILES[index]; };

    Window_Languages.prototype.drawItem = function(index) {
        const name = this.item(index);
        const status = window.LANGUAGE_ENABLED[name] ? "[ON]" : "[OFF]";
        const rect = this.itemRect(index);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
        this.drawText(name + " " + status, rect.x + 10, rect.y, rect.width - 10, 'left');
    };

    Window_Languages.prototype.processOk = function() {
        const name = this.item(this.index());
        window.LANGUAGE_ENABLED[name] = !window.LANGUAGE_ENABLED[name];
        SoundManager.playOk();
        this.refresh();
    };

})();