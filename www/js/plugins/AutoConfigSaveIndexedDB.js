(function() {

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.call(this);
        config.textSpeed = $gameSystem ? $gameSystem._messageSpeed : 30;
        config.bgmVolume = AudioManager._bgmVolume !== undefined ? AudioManager._bgmVolume : 100;
        config.seVolume = AudioManager._seVolume !== undefined ? AudioManager._seVolume : 100;
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);

        const speed = Number(config.textSpeed || 30);
        this.textSpeed = speed;
        if ($gameSystem) $gameSystem._messageSpeed = speed;

        if (config.bgmVolume !== undefined) AudioManager._bgmVolume = config.bgmVolume;
        if (config.seVolume !== undefined) AudioManager._seVolume = config.seVolume;
    };

    const autoSaveInterval = 1000;
    let lastSaveTime = 0;

    const _Scene_Boot_update = Scene_Boot.prototype.update;
    Scene_Boot.prototype.update = function() {
        _Scene_Boot_update.call(this);

        if (!$gameTemp._autoConfigSaverStarted && $gameSystem) {
            $gameTemp._autoConfigSaverStarted = true;
            setInterval(() => {
                try {
                    ConfigManager.save();
                    
                } catch (e) {
                    console.error("Auto Config Save failed:", e);
                }
            }, autoSaveInterval);
        }
    };
})();