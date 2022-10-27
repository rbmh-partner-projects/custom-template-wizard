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
import doT from 'dot';
import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import { CustomScriptFramework, CustomScriptLanguage } from '../types/enum.js';
function renderTemplate(filePath, config, crepoConfig) {
    return __awaiter(this, void 0, void 0, function () {
        var templateContent, template;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(filePath)];
                case 1:
                    templateContent = _a.sent();
                    template = doT.template(templateContent.toString('utf-8'), __assign(__assign({}, doT.templateSettings), { strip: false }));
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
        parser: 'babel'
    };
    if (fileExtension === 'vue' || fileExtension === 'svelte') {
        baseConfig = __assign(__assign({}, baseConfig), { parser: 'html' });
    }
    //please format my rendered template using prettier
    return prettier.format(content, baseConfig);
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
                    destPath = fullDestinationPath.split('.').pop() == 't'
                        ? fullDestinationPath.substring(0, fullDestinationPath.length - 2)
                        : fullDestinationPath;
                    renderedTemplate = formatTemplate(renderedTemplate, destPath);
                    return [4 /*yield*/, fs.writeFile(destPath, renderedTemplate)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, fs.copyFile(fullPath, fullDestinationPath)];
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
                    filesInFolder = fs.readdirSync(sourcePath);
                    _i = 0, filesInFolder_1 = filesInFolder;
                    _a.label = 1;
                case 1:
                    if (!(_i < filesInFolder_1.length)) return [3 /*break*/, 6];
                    file = filesInFolder_1[_i];
                    fullPath = path.join(sourcePath, file);
                    fullDestinationPath = path.join(destinationPath, file);
                    if (!fs.lstatSync(fullPath).isDirectory()) return [3 /*break*/, 3];
                    return [4 /*yield*/, renderAndCopyFilesInFolder(fullPath, fullDestinationPath, config, crepoConfig)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    fs.ensureDirSync(path.parse(fullDestinationPath).dir);
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
        var basePath, graphQLConfigFile, _i, entries_1, entry, sourcePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    basePath = path.join(process.cwd(), 'src');
                    // clear src directory first
                    return [4 /*yield*/, fs.remove(basePath)];
                case 1:
                    // clear src directory first
                    _a.sent();
                    graphQLConfigFile = path.join(process.cwd(), 'graphql.config.js');
                    if (!fs.existsSync(graphQLConfigFile)) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.remove(graphQLConfigFile)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i = 0, entries_1 = entries;
                    _a.label = 4;
                case 4:
                    if (!(_i < entries_1.length)) return [3 /*break*/, 9];
                    entry = entries_1[_i];
                    sourcePath = entry.sourcePath;
                    destinationPath = path.join(basePath, entry.destinationPath);
                    // in case we got a file here, we need to get the path of that file, otherwise a folder with the filename will be created
                    fs.mkdirSync(entry.isFile ? path.parse(destinationPath).dir : destinationPath, {
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
    getTemplateStructure: function (workingPath, config) { return __awaiter(void 0, void 0, void 0, function () {
        var templatePaths, basePath, isTypeScript, isPreact, isSvelte, isVue, isTsAndPreact, isJsAndPreact, isJsAndVanilla, isTsAndVanilla, languagePath, deleteUserDataCallbackFileName, uimEndPoint, fileName, frameworkPath, componentPath, AppVueConfig, stylesPath, assetsPath, binPath, serverTypeDefPath, frontendTypeDefPath, appFileName, appPath;
        return __generator(this, function (_a) {
            templatePaths = [];
            basePath = path.join(workingPath, 'setup', 'templates');
            isTypeScript = config.language == CustomScriptLanguage.TYPESCRIPT;
            isPreact = config.framework === CustomScriptFramework.PREACT;
            isSvelte = config.framework === CustomScriptFramework.SVELTE;
            isVue = config.framework === CustomScriptFramework.VUE;
            isTsAndPreact = config.language == CustomScriptLanguage.TYPESCRIPT &&
                config.framework === CustomScriptFramework.PREACT;
            isJsAndPreact = config.language == CustomScriptLanguage.JAVASCRIPT &&
                config.framework === CustomScriptFramework.PREACT;
            isJsAndVanilla = config.language == CustomScriptLanguage.JAVASCRIPT &&
                config.framework === CustomScriptFramework.VANILLA;
            isTsAndVanilla = config.language == CustomScriptLanguage.TYPESCRIPT &&
                config.framework === CustomScriptFramework.VANILLA;
            languagePath = path.join(basePath, !isTypeScript ? 'javascript' : 'typescript');
            // we only need an API / Backend if user collects user data (for delete endpoint) or is using the CREPO (crepo requests should be made in the backend)
            if (config.collectsUserData) {
                deleteUserDataCallbackFileName = "delete-user-data-callback." + (isTypeScript ? 't' : 'j') + "s";
                templatePaths.push({
                    sourcePath: path.join(languagePath, 'api', deleteUserDataCallbackFileName),
                    destinationPath: path.join('.', 'server', 'routes', deleteUserDataCallbackFileName),
                    isFile: true
                });
                uimEndPoint = "uim-jotform." + (isTypeScript ? 't' : 'j') + "s";
                templatePaths.push({
                    sourcePath: path.join(languagePath, 'api', uimEndPoint),
                    destinationPath: path.join('.', 'server', 'routes', uimEndPoint),
                    isFile: true
                });
                // add utils (jotform) for userData
                templatePaths.push({
                    sourcePath: path.join(languagePath, 'utils'),
                    destinationPath: path.join('.', 'custom-script', 'utils'),
                    isFile: false
                });
            }
            if (config.useCREPO) {
                fileName = "graphql-api." + (isTypeScript ? 't' : 'j') + "s";
                templatePaths.push({
                    sourcePath: path.join(languagePath, 'api', fileName),
                    destinationPath: path.join('.', 'server', 'routes', fileName),
                    isFile: true
                });
                templatePaths.push({
                    sourcePath: path.join(languagePath, 'api', 'utils'),
                    destinationPath: path.join('.', 'server', 'utils'),
                    isFile: false
                });
                templatePaths.push({
                    sourcePath: path.join(languagePath, 'api', 'queries'),
                    destinationPath: path.join('.', 'server', 'queries'),
                    isFile: false
                });
                templatePaths.push({
                    sourcePath: path.join(basePath, 'graphql.config.js.t'),
                    destinationPath: path.join('..', 'graphql.config.js.t'),
                    isFile: true
                });
            }
            frameworkPath = path.join(languagePath, 'frameworks');
            templatePaths.push({
                sourcePath: path.join(frameworkPath, "main." + (isTypeScript ? 't' : 'j') + "s.t"),
                destinationPath: path.join('.', 'custom-script', "main." + (isTypeScript ? 'ts' : 'js') + (isPreact ? 'x' : '')),
                isFile: true
            });
            templatePaths.push({
                sourcePath: path.join(frameworkPath, 'rollup.config.js.t'),
                destinationPath: path.join('.', 'custom-script', 'rollup.config.js.t'),
                isFile: true
            });
            componentPath = path.join(basePath, 'component');
            templatePaths.push({
                sourcePath: path.join(componentPath, 'Card.js.t'),
                destinationPath: path.join('.', 'custom-script', 'components', "Card." + (isSvelte ? 'svelte' : '') + (isVue ? 'vue' : '') + (isJsAndVanilla ? 'js' : '') + (isTsAndVanilla ? 'ts' : '') + (isTsAndPreact ? 'tsx' : '') + (isJsAndPreact ? 'jsx' : '')),
                isFile: true
            });
            // we need to copy the App.vue file
            if (isVue) {
                AppVueConfig = {
                    absolutePath: path.join(basePath, 'App.vue'),
                    fileName: 'App.vue'
                };
                templatePaths.push({
                    sourcePath: AppVueConfig.absolutePath,
                    destinationPath: path.join('.', 'custom-script', AppVueConfig.fileName),
                    isFile: true
                });
            }
            stylesPath = path.join(basePath, 'styles');
            templatePaths.push({
                sourcePath: stylesPath,
                destinationPath: path.join('.', 'custom-script', 'styles'),
                isFile: false
            });
            assetsPath = path.join(basePath, 'assets');
            templatePaths.push({
                sourcePath: assetsPath,
                destinationPath: path.join('.', 'custom-script', 'assets'),
                isFile: false
            });
            binPath = path.join(languagePath, 'api', 'bin');
            templatePaths.push({
                sourcePath: binPath,
                destinationPath: path.join('.', 'server', 'bin'),
                isFile: false
            });
            // copy type definitions
            if (isTypeScript) {
                serverTypeDefPath = path.join(languagePath, 'api', 'types.d.ts');
                templatePaths.push({
                    sourcePath: serverTypeDefPath,
                    destinationPath: path.join('.', 'server', 'types.d.ts'),
                    isFile: true
                });
                frontendTypeDefPath = path.join(languagePath, 'frameworks', 'types.d.ts');
                templatePaths.push({
                    sourcePath: frontendTypeDefPath,
                    destinationPath: path.join('.', 'custom-script', 'types.d.ts'),
                    isFile: true
                });
            }
            appFileName = "app." + (isTypeScript ? 't' : 'j') + "s.t";
            appPath = path.join(languagePath, appFileName);
            templatePaths.push({
                sourcePath: appPath,
                destinationPath: path.join('.', 'server', appFileName),
                isFile: true
            });
            return [2 /*return*/, templatePaths];
        });
    }); }
};
export default template;
//# sourceMappingURL=template.js.map