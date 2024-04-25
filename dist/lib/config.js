import Conf from 'conf';
var cfgFile = new Conf({
    configName: 'rb-custom-script',
    cwd: process.cwd(),
});
var config = {
    save: function (cfg) {
        cfg.updated = new Date();
        cfgFile.set(cfg);
    },
    load: function () {
        return cfgFile.store;
    },
};
export default config;
//# sourceMappingURL=config.js.map