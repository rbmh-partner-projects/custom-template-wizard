"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var dot_1 = require("dot");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var prettier_1 = require("prettier");
var enum_1 = require("../types/enum");
function renderTemplate(filePath, config, crepoConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var templateContent, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1["default"].readFile(filePath)];
                case 1:
                    templateContent = _a.sent();
                    template = dot_1["default"].template(templateContent.toString('utf-8'), __assign(__assign({}, dot_1["default"].templateSettings), { strip: false }));
                    if (crepoConfig && crepoConfig.useCREPO) {
                        return [2 /*return*/, template(__assign(__assign({}, config), { crepoAPIKeyProd: crepoConfig.crepoAPIKeyProd }))];
                    }
                    return [2 /*return*/, template(config)];
            }
        });
    });
}
function formatTemplate(content, destPath) {
    var fileExtension = destPath.split('.').pop();
    var baseConfig = {
        tabWidth: 2,
        printWidth: 100,
        pluginSearchDirs: [process.cwd()],
        parser: "babel"
    };
    if (fileExtension === "vue" || fileExtension === "svelte") {
        baseConfig = __assign(__assign({}, baseConfig), { parser: "html" });
    }
    //please format my rendered template using prettier
    return prettier_1["default"].format(content, baseConfig);
}
function renderAndCopyFile(file, fullPath, fullDestinationPath, config, crepoConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var renderedTemplate, destPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(file.split('.').pop() == 't')) return [3 /*break*/, 3];
                    return [4 /*yield*/, renderTemplate(fullPath, config, crepoConfig)];
                case 1:
                    renderedTemplate = _a.sent();
                    destPath = fullDestinationPath.split('.').pop() == 't' ? fullDestinationPath.substring(0, fullDestinationPath.length - 2) : fullDestinationPath;
                    renderedTemplate = formatTemplate(renderedTemplate, destPath);
                    return [4 /*yield*/, fs_extra_1["default"].writeFile(destPath, renderedTemplate)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, fs_extra_1["default"].copyFile(fullPath, fullDestinationPath)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function renderAndCopyFilesInFolder(sourcePath, destinationPath, config, crepoConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var filesInFolder, _i, filesInFolder_1, file, fullPath, fullDestinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filesInFolder = fs_extra_1["default"].readdirSync(sourcePath);
                    _i = 0, filesInFolder_1 = filesInFolder;
                    _a.label = 1;
                case 1:
                    if (!(_i < filesInFolder_1.length)) return [3 /*break*/, 6];
                    file = filesInFolder_1[_i];
                    fullPath = path_1["default"].join(sourcePath, file);
                    fullDestinationPath = path_1["default"].join(destinationPath, file);
                    if (!fs_extra_1["default"].lstatSync(fullPath).isDirectory()) return [3 /*break*/, 3];
                    return [4 /*yield*/, renderAndCopyFilesInFolder(fullPath, fullDestinationPath, config, crepoConfig)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    fs_extra_1["default"].ensureDirSync(path_1["default"].parse(fullDestinationPath).dir);
                    return [4 /*yield*/, renderAndCopyFile(file, fullPath, fullDestinationPath, config)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
var template = {
    copyFiles: function (entries, config, crepoConfig) { return __awaiter(void 0, void 0, void 0, function () {
        var basePath, baseSrcPath, graphQLConfigFile, _i, entries_1, entry, sourcePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    basePath = path_1["default"].join(process.cwd(), 'src');
                    baseSrcPath = path_1["default"].join(process.cwd(), '.wizard');
                    // clear src directory first
                    return [4 /*yield*/, fs_extra_1["default"].remove(basePath)];
                case 1:
                    // clear src directory first
                    _a.sent();
                    graphQLConfigFile = path_1["default"].join(process.cwd(), 'graphql.config.js');
                    if (!fs_extra_1["default"].existsSync(graphQLConfigFile)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs_extra_1["default"].remove(graphQLConfigFile)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i = 0, entries_1 = entries;
                    _a.label = 4;
                case 4:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 9];
                    entry = entries_1[_i];
                    sourcePath = path_1["default"].join(baseSrcPath, entry.sourcePath);
                    destinationPath = path_1["default"].join(basePath, entry.destinationPath);
                    // in case we got a file here, we need to get the path of that file, otherwise a folder with the filename will be created
                    fs_extra_1["default"].mkdirSync(entry.isFile ? path_1["default"].parse(destinationPath).dir : destinationPath, {
                        recursive: true
                    });
                    if (!!entry.isFile) return [3 /*break*/, 6];
                    return [4 /*yield*/, renderAndCopyFilesInFolder(sourcePath, destinationPath, config, crepoConfig)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, renderAndCopyFile(sourcePath, sourcePath, destinationPath, config, crepoConfig)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 4];
                case 9: return [2 /*return*/];
            }
        });
    }); },
    getTemplateStructure: function (config) { return __awaiter(void 0, void 0, void 0, function () {
        var templatePaths, basePath, isTypeScript, isPreact, isSvelte, isVue, isTsAndPreact, isJsAndPreact, isJsAndVanilla, isTsAndVanilla, languagePath, deleteUserDataCallbackFileName, uimEndPoint, fileName, frameworkPath, componentPath, AppVueConfig, stylesPath, assetsPath, binPath, serverTypeDefPath, frontendTypeDefPath, appFileName, appPath;
        return __generator(this, function (_a) {
            templatePaths = [];
            basePath = path_1["default"].join('.', 'templates');
            isTypeScript = config.language == enum_1.CustomScriptLanguage.TYPESCRIPT;
            isPreact = config.framework === enum_1.CustomScriptFramework.PREACT;
            isSvelte = config.framework === enum_1.CustomScriptFramework.SVELTE;
            isVue = config.framework === enum_1.CustomScriptFramework.VUE;
            isTsAndPreact = config.language == enum_1.CustomScriptLanguage.TYPESCRIPT && config.framework === enum_1.CustomScriptFramework.PREACT;
            isJsAndPreact = config.language == enum_1.CustomScriptLanguage.JAVASCRIPT && config.framework === enum_1.CustomScriptFramework.PREACT;
            isJsAndVanilla = config.language == enum_1.CustomScriptLanguage.JAVASCRIPT && config.framework === enum_1.CustomScriptFramework.VANILLA;
            isTsAndVanilla = config.language == enum_1.CustomScriptLanguage.TYPESCRIPT && config.framework === enum_1.CustomScriptFramework.VANILLA;
            languagePath = path_1["default"].join(basePath, !isTypeScript ? 'javascript' : 'typescript');
            // we only need an API / Backend if user collects user data (for delete endpoint) or is using the CREPO (crepo requests should be made in the backend)
            if (config.collectsUserData) {
                deleteUserDataCallbackFileName = "delete-user-data-callback.".concat(isTypeScript ? 't' : 'j', "s");
                templatePaths.push({
                    sourcePath: path_1["default"].join(languagePath, 'api', deleteUserDataCallbackFileName),
                    destinationPath: path_1["default"].join('.', 'server', 'routes', deleteUserDataCallbackFileName),
                    isFile: true
                });
                uimEndPoint = "uim-jotform.".concat(isTypeScript ? 't' : 'j', "s");
                templatePaths.push({
                    sourcePath: path_1["default"].join(languagePath, 'api', uimEndPoint),
                    destinationPath: path_1["default"].join('.', 'server', 'routes', uimEndPoint),
                    isFile: true
                });
                // add utils (jotform) for userData
                templatePaths.push({
                    sourcePath: path_1["default"].join(languagePath, 'utils'),
                    destinationPath: path_1["default"].join('.', 'custom-script', 'utils'),
                    isFile: false
                });
            }
            if (config.useCREPO) {
                fileName = "graphql-api.".concat(isTypeScript ? 't' : 'j', "s");
                templatePaths.push({
                    sourcePath: path_1["default"].join(languagePath, 'api', fileName),
                    destinationPath: path_1["default"].join('.', 'server', 'routes', fileName),
                    isFile: true
                });
                templatePaths.push({
                    sourcePath: path_1["default"].join(languagePath, 'api', 'utils'),
                    destinationPath: path_1["default"].join('.', 'server', 'utils'),
                    isFile: false
                });
                templatePaths.push({
                    sourcePath: path_1["default"].join(languagePath, 'api', 'queries'),
                    destinationPath: path_1["default"].join('.', 'server', 'queries'),
                    isFile: false
                });
                templatePaths.push({
                    sourcePath: path_1["default"].join(basePath, 'graphql.config.js.t'),
                    destinationPath: path_1["default"].join('..', 'graphql.config.js.t'),
                    isFile: true
                });
            }
            frameworkPath = path_1["default"].join(languagePath, 'frameworks');
            templatePaths.push({
                sourcePath: path_1["default"].join(frameworkPath, "main.".concat(isTypeScript ? 't' : 'j', "s.t")),
                destinationPath: path_1["default"].join('.', 'custom-script', "main.".concat(isTypeScript ? 'ts' : 'js').concat(isPreact ? 'x' : '')),
                isFile: true
            });
            templatePaths.push({
                sourcePath: path_1["default"].join(frameworkPath, 'rollup.config.js.t'),
                destinationPath: path_1["default"].join('.', 'custom-script', 'rollup.config.js.t'),
                isFile: true
            });
            componentPath = path_1["default"].join(basePath, 'component');
            templatePaths.push({
                sourcePath: path_1["default"].join(componentPath, "Card.js.t"),
                destinationPath: path_1["default"].join('.', 'custom-script', 'components', "Card.".concat(isSvelte ? 'svelte' : '').concat(isVue ? 'vue' : '').concat(isJsAndVanilla ? 'js' : '').concat(isTsAndVanilla ? 'ts' : '').concat(isTsAndPreact ? 'tsx' : '').concat(isJsAndPreact ? 'jsx' : '')),
                isFile: true
            });
            // we need to copy the App.vue file
            if (isVue) {
                AppVueConfig = {
                    absolutePath: path_1["default"].join(basePath, "App.vue"),
                    fileName: "App.vue"
                };
                templatePaths.push({
                    sourcePath: AppVueConfig.absolutePath,
                    destinationPath: path_1["default"].join('.', 'custom-script', AppVueConfig.fileName),
                    isFile: true
                });
            }
            stylesPath = path_1["default"].join(basePath, 'styles');
            templatePaths.push({
                sourcePath: stylesPath,
                destinationPath: path_1["default"].join('.', 'custom-script', 'styles'),
                isFile: false
            });
            assetsPath = path_1["default"].join(basePath, 'assets');
            templatePaths.push({
                sourcePath: assetsPath,
                destinationPath: path_1["default"].join('.', 'custom-script', 'assets'),
                isFile: false
            });
            binPath = path_1["default"].join(languagePath, 'api', 'bin');
            templatePaths.push({
                sourcePath: binPath,
                destinationPath: path_1["default"].join('.', 'server', 'bin'),
                isFile: false
            });
            // copy type definitions
            if (isTypeScript) {
                serverTypeDefPath = path_1["default"].join(languagePath, 'api', 'types.d.ts');
                templatePaths.push({
                    sourcePath: serverTypeDefPath,
                    destinationPath: path_1["default"].join('.', 'server', 'types.d.ts'),
                    isFile: true
                });
                frontendTypeDefPath = path_1["default"].join(languagePath, 'frameworks', 'types.d.ts');
                templatePaths.push({
                    sourcePath: frontendTypeDefPath,
                    destinationPath: path_1["default"].join('.', 'custom-script', 'types.d.ts'),
                    isFile: true
                });
            }
            appFileName = "app.".concat(isTypeScript ? 't' : 'j', "s.t");
            appPath = path_1["default"].join(languagePath, appFileName);
            templatePaths.push({
                sourcePath: appPath,
                destinationPath: path_1["default"].join('.', 'server', appFileName),
                isFile: true
            });
            return [2 /*return*/, templatePaths];
        });
    }); }
};
exports["default"] = template;