#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
import chalk from 'chalk';
import { execSync } from 'child_process';
import clear from 'clear';
import figlet from 'figlet';
import fs from 'fs-extra';
import path from 'path';
import config from './lib/config.js';
import files from './lib/files.js';
import inquirer from './lib/inquirer.js';
import template from './lib/template.js';
import URL from 'url';
var redBullRed = '#f30b47';
var redBullChalk = chalk.hex(redBullRed);
var log = console.log;
if (process.argv.length == 3 && process.argv[2] == 'setup') {
    console.log('Exec path' + process.execPath);
    var buildPath = URL.fileURLToPath((_a = import.meta) === null || _a === void 0 ? void 0 : _a.url);
    var packagePath = path.join(buildPath, '..', '..');
    console.log('Package', packagePath);
    init(packagePath);
}
function exit() {
    log();
    log(chalk.yellow('The custom-script wizard exited gracefully. No changes were made.'));
    log();
    process.exit();
}
function init(workingPath) {
    return __awaiter(this, void 0, void 0, function () {
        var cfg, confirmOverride, consumerDataAnswers, crepoAnswers, preferredLanguage, preferredFramework, startDevEnv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // clear the terminal first
                    clear();
                    log(redBullChalk(figlet.textSync('Red Bull', { horizontalLayout: 'full' })));
                    cfg = config.load();
                    return [4 /*yield*/, files.sourceFilesModified(cfg)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 3];
                    log(chalk.white("It looks like you have already modified your scripts. Using this wizard will " + chalk.bold('override your changes') + "."));
                    return [4 /*yield*/, inquirer.askIfWantToOverrideChanges()];
                case 2:
                    confirmOverride = (_a.sent()).confirmOverride;
                    if (!confirmOverride) {
                        exit();
                    }
                    _a.label = 3;
                case 3: return [4 /*yield*/, inquirer.askIfCollectingConsumerData()];
                case 4:
                    consumerDataAnswers = _a.sent();
                    return [4 /*yield*/, inquirer.askIfUsingCREPO()];
                case 5:
                    crepoAnswers = _a.sent();
                    return [4 /*yield*/, inquirer.askForPreferredLanguage()];
                case 6:
                    preferredLanguage = _a.sent();
                    return [4 /*yield*/, inquirer.askForPreferredFramework(preferredLanguage)];
                case 7:
                    preferredFramework = _a.sent();
                    cfg = {
                        collectsUserData: consumerDataAnswers.collectsConsumerData,
                        useCREPO: crepoAnswers.useCREPO,
                        framework: preferredFramework,
                        language: preferredLanguage
                    };
                    return [4 /*yield*/, setEnv(consumerDataAnswers, crepoAnswers)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, processConfig(cfg, crepoAnswers, workingPath)];
                case 9:
                    _a.sent();
                    if (cfg.collectsUserData &&
                        (!consumerDataAnswers.rbAccountTokenProd ||
                            !consumerDataAnswers.rbAccountTokenStg)) {
                        console.log(chalk.yellow(chalk.bold('Warning') + ": You have decided not to import keys for the " + chalk.bold('Red Bull Account SDK') + ". However, the examples provided require these keys. If you do want to provide them, please restart the setup."));
                    }
                    if (cfg.useCREPO &&
                        (!crepoAnswers.crepoAPIKeyStg || !crepoAnswers.crepoAPIKeyProd)) {
                        console.log(chalk.yellow(chalk.bold('Warning') + ": You decided not to import keys for the " + chalk.bold('CREPO SDK') + ". However, the examples provided require these keys. If you do want to provide them, please restart the setup."));
                    }
                    return [4 /*yield*/, inquirer.askIfWantToStartDevEnv()];
                case 10:
                    startDevEnv = _a.sent();
                    if (startDevEnv) {
                        try {
                            execSync('npm run start:dev', {
                                stdio: 'inherit',
                                killSignal: 'SIGINT'
                            });
                        }
                        catch (e) {
                            process.exit(0);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export function setEnv(consumerConfig, crepoConfig) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var filePath, fileStream;
        return __generator(this, function (_f) {
            filePath = path.join('.', '.env.redbull');
            fileStream = fs.createWriteStream(filePath, {
                flags: 'w'
            });
            fileStream.write("REDBULL_ACCOUNT_TOKEN_STAGING=" + ((_a = consumerConfig.rbAccountTokenStg) !== null && _a !== void 0 ? _a : '') + "\n");
            fileStream.write("REDBULL_ACCOUNT_TOKEN_PRODUCTION=" + ((_b = consumerConfig.rbAccountTokenProd) !== null && _b !== void 0 ? _b : '') + "\n");
            fileStream.write("JOTFORM_ID=" + ((_c = consumerConfig.jotFormId) !== null && _c !== void 0 ? _c : '') + "\n");
            fileStream.write("CREPO_API_KEY_STAGING=" + ((_d = crepoConfig.crepoAPIKeyStg) !== null && _d !== void 0 ? _d : '') + "\n");
            fileStream.write("CREPO_API_KEY_PRODUCTION=" + ((_e = crepoConfig.crepoAPIKeyProd) !== null && _e !== void 0 ? _e : '') + "\n");
            fileStream.end();
            return [2 /*return*/];
        });
    });
}
export function processConfig(cfg, crepoConfig, workingPath) {
    return __awaiter(this, void 0, void 0, function () {
        var templateStructure;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // get template structure
                    if (!workingPath) {
                        workingPath = process.cwd();
                    }
                    return [4 /*yield*/, template.getTemplateStructure(workingPath, cfg)];
                case 1:
                    templateStructure = _a.sent();
                    return [4 /*yield*/, template.copyFiles(templateStructure, cfg, crepoConfig)
                        // save config
                    ];
                case 2:
                    _a.sent();
                    // save config
                    config.save(cfg);
                    return [2 /*return*/];
            }
        });
    });
}
export default { init: init };
//# sourceMappingURL=index.js.map