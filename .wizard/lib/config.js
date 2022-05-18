"use strict";
exports.__esModule = true;
var conf_1 = require("conf");
var cfgFile = new conf_1["default"]({
    configName: 'rb-custom-script',
    cwd: process.cwd()
});
var config = {
    save: function (cfg) {
        cfg.updated = new Date();
        cfgFile.set(cfg);
    },
    load: function () {
        return cfgFile.store;
    }
};
exports["default"] = config;
