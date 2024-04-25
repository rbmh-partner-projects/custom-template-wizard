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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import fs from 'fs-extra';
import path from 'path';
var getFilesInDirectory = function (dir) { return __awaiter(void 0, void 0, void 0, function () {
    var files, _i, _a, file, absPath, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!fs.pathExists(dir)) {
                    return [2 /*return*/, []];
                }
                files = [];
                _i = 0;
                return [4 /*yield*/, fs.readdir(dir)];
            case 1:
                _a = _d.sent();
                _d.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                file = _a[_i];
                absPath = path.join(dir, file);
                return [4 /*yield*/, fs.stat(absPath)];
            case 3: return [4 /*yield*/, (_d.sent()).isDirectory()];
            case 4:
                if (!_d.sent()) return [3 /*break*/, 6];
                _c = (_b = files).concat;
                return [4 /*yield*/, getFilesInDirectory(absPath)];
            case 5:
                files = _c.apply(_b, [_d.sent()]);
                return [3 /*break*/, 7];
            case 6:
                files.push(absPath);
                _d.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 2];
            case 8: return [2 /*return*/, files];
        }
    });
}); };
var files = {
    sourceFilesModified: function (config) { return __awaiter(void 0, void 0, void 0, function () {
        var appPath, filesInApp, filesWithTime, latestFileChange;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!config.updated) {
                        return [2 /*return*/, false];
                    }
                    appPath = path.join('.', 'src');
                    if (!fs.existsSync(appPath)) {
                        fs.ensureDirSync(appPath);
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, getFilesInDirectory(appPath)];
                case 1:
                    filesInApp = _a.sent();
                    return [4 /*yield*/, Promise.all(filesInApp.map(function (path) { return __awaiter(void 0, void 0, void 0, function () {
                            var fileStat;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fs.stat(path)];
                                    case 1:
                                        fileStat = _a.sent();
                                        return [2 /*return*/, {
                                                path: path,
                                                dateChange: fileStat.mtime,
                                            }];
                                }
                            });
                        }); }))];
                case 2:
                    filesWithTime = _a.sent();
                    filesWithTime = filesWithTime.sort(function (a, b) {
                        return b.dateChange.valueOf() - a.dateChange.valueOf();
                    });
                    latestFileChange = filesWithTime.length > 0 ? filesWithTime[0] : null;
                    if (!latestFileChange) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, (latestFileChange.dateChange.valueOf() > new Date(config.updated).valueOf())];
            }
        });
    }); },
};
export default files;
//# sourceMappingURL=files.js.map