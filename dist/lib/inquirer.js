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
import inquirer from 'inquirer';
import { CustomScriptFramework, CustomScriptLanguage } from '../types/enum.js';
var inq = {
    askIfWantToStartDevEnv: function () { return __awaiter(void 0, void 0, void 0, function () {
        var question, answer;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    question = [
                        {
                            name: 'startDevEnv',
                            type: 'confirm',
                            message: 'Your settings were successfully processed. Do you want to start the development environment?',
                            "default": false
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(question)];
                case 1:
                    answer = _b.sent();
                    return [2 /*return*/, (_a = answer === null || answer === void 0 ? void 0 : answer.startDevEnv) !== null && _a !== void 0 ? _a : false];
            }
        });
    }); },
    askIfWantToOverrideChanges: function () {
        var question = [
            {
                name: 'confirmOverride',
                type: 'confirm',
                message: 'Do you want to continue and override your changes?',
                "default": false
            },
        ];
        return inquirer.prompt(question);
    },
    askIfUsingCREPO: function () { return __awaiter(void 0, void 0, void 0, function () {
        var questions, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questions = [
                        {
                            name: 'useCREPO',
                            type: 'confirm',
                            message: 'Are you going to use the CREPO?',
                            "default": false
                        },
                        {
                            name: 'crepoKeyStg',
                            type: 'input',
                            when: function (answers) {
                                return answers.useCREPO;
                            },
                            message: 'Please provide your CREPO API key for the staging environment:'
                        },
                        {
                            name: 'crepoKeyProd',
                            type: 'input',
                            when: function (answers) {
                                return answers.useCREPO;
                            },
                            message: 'Please provide your CREPO API key for the production environment:'
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, {
                            useCREPO: result.useCREPO,
                            crepoAPIKeyProd: result.crepoKeyProd,
                            crepoAPIKeyStg: result.crepoKeyStg
                        }];
            }
        });
    }); },
    askIfCollectingConsumerData: function () { return __awaiter(void 0, void 0, void 0, function () {
        var questions, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    questions = [
                        {
                            name: 'collectsUserData',
                            type: 'confirm',
                            message: 'Are you going to collect consumer data?',
                            "default": false
                        },
                        {
                            name: 'jotFormId',
                            type: 'input',
                            when: function (answers) {
                                return answers.collectsUserData;
                            },
                            message: 'Please provide your JotForm ID:',
                            validate: function (input) {
                                return input && input.trim() !== '';
                            }
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(questions)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, {
                            collectsConsumerData: answers.collectsUserData,
                            jotFormId: answers.jotFormId
                        }];
            }
        });
    }); },
    askForPreferredLanguage: function () { return __awaiter(void 0, void 0, void 0, function () {
        var question, preferredLanguage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question = [
                        {
                            name: 'preferredLanguage',
                            type: 'list',
                            message: 'Do you prefer Typescript or Javascript?',
                            choices: ['TypeScript', 'JavaScript']
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(question)];
                case 1:
                    preferredLanguage = (_a.sent()).preferredLanguage;
                    return [2 /*return*/, preferredLanguage === 'TypeScript'
                            ? CustomScriptLanguage.TYPESCRIPT
                            : CustomScriptLanguage.JAVASCRIPT];
            }
        });
    }); },
    askForPreferredFramework: function (preferredLanguage) { return __awaiter(void 0, void 0, void 0, function () {
        var question, preferredFramework;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question = [
                        {
                            name: 'preferredFramework',
                            type: 'list',
                            message: 'Which framework do you prefer for your work?',
                            choices: [
                                "Vanilla " + (preferredLanguage === CustomScriptLanguage.JAVASCRIPT
                                    ? 'JavaScript'
                                    : 'TypeScript'),
                                'Preact',
                                'Svelte',
                                'Vue',
                            ]
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(question)];
                case 1:
                    preferredFramework = (_a.sent()).preferredFramework;
                    if (preferredFramework === 'Preact')
                        return [2 /*return*/, CustomScriptFramework.PREACT];
                    if (preferredFramework === 'Svelte')
                        return [2 /*return*/, CustomScriptFramework.SVELTE];
                    if (preferredFramework === 'Vue')
                        return [2 /*return*/, CustomScriptFramework.VUE];
                    return [2 /*return*/, CustomScriptFramework.VANILLA];
            }
        });
    }); }
};
export default inq;
//# sourceMappingURL=inquirer.js.map