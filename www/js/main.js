const GAME_VERSION = "3.0.2";
PluginManager.setup($plugins);

window.addEventListener("load", async () => {
    try {
        let r = await fetch("data/LANGDATA");
        let t = await r.text();
        if (t.startsWith("LANGDATA")) t = t.slice(8);
        window.LANGDATA = JSON.parse(t);
        SceneManager.run(Scene_Boot);
    } catch (e) {
        console.error("LANGDATA failed", e);
    }
});