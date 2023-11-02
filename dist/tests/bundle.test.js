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
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import fs from 'fs-extra';
import { afterEach, describe, it } from 'mocha';
import path from 'path';
import { processConfig, setEnv } from '../index';
import { CustomScriptFramework, CustomScriptLanguage } from '../types/enum';
import * as uimPayload from './resources/uim_payload.json';
dotenv.config();
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
chai.should();
function importFresh() {
    return __awaiter(this, void 0, void 0, function () {
        var newFileName, javaScriptFile, typeScriptFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newFileName = "app" + Date.now();
                    javaScriptFile = path.join(process.cwd(), 'src', 'server', 'app.js');
                    typeScriptFile = path.join(process.cwd(), 'src', 'server', 'app.ts');
                    if (fs.existsSync(javaScriptFile)) {
                        fs.renameSync(javaScriptFile, path.join(process.cwd(), 'src', 'server', newFileName + '.js'));
                        newFileName += '.js';
                    }
                    else {
                        fs.renameSync(typeScriptFile, path.join(process.cwd(), 'src', 'server', newFileName + '.ts'));
                        newFileName += '.ts';
                    }
                    return [4 /*yield*/, import("../../src/server/" + newFileName)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var accountDeletionSignature = 'YQ97dyoBwJC9VDwkylWqJVq0M/48LId7QVjQnIW4R6z8QdlNvQ5+26XbOh5ZCdm465irUPpCGyOa9092qMJYHefzenokIsIdaGCezPFcL7fww3o5FkGa76qMP2Htgrx/vO9CJrgqg9JT8nTurFOCLSKpAlGkv7LtYZmfYvjIJFR62umW1NXAM1PtCj5nEQFnze6R+yXGemuM+hXqni9x9HvpXpHxkUhV6r1HBFJ0Os5kShe6gxhO7zarfoBzHXaeQ+8M7Wp4HEAT/LhDFJG1UTHJu6KpnZxYDcxRIflPYj1mFGQDzroFCCbRgjKMD9NeVx69wvbMsnxqs9QfXCFWKA==';
var uimSignature = 'qtBSUvCcZU2IyxybBJBtV7+iOl9HaTe9ERmro/k7bNPJXiPw2C4c0PXQkwoA4N4frRBhyg6oPojG9ZPMv7QmumbOKSNvjFF1aSkZXL3+lS3xMmXr7g/MqJTxz0oBDLm1u5rfnmOPNy2DQ7VYbsLd6sRqq8r4UgYNczi3u0P7X5yyBqjNnMAF0guAYJaUJ0DcomSmpcBy8sB+uSy+d7/ASFyFh2PFr4YtMAxTLkqLlxcln4D/j2bRNnX2rpLMsQiuvSO1adJKeK6KYWvQK6O65SQJ7EZ8slQdpxoQLaOeQjiIoyqIxv8fOuVa6ZyYNa4Sau4N6lXhqfALp1TzcGUByw==';
describe('JavaScript', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            describe('Vanilla', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.VANILLA,
                                    language: CustomScriptLanguage.JAVASCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,
                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('Preact JS', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.PREACT,
                                    language: CustomScriptLanguage.JAVASCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,
                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('Svelte JS', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.SVELTE,
                                    language: CustomScriptLanguage.JAVASCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,

                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('Vue JS', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.VUE,
                                    language: CustomScriptLanguage.JAVASCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,

                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
describe('Typescript', function () {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            describe('Vanilla', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.VANILLA,
                                    language: CustomScriptLanguage.TYPESCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,

                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('Preact JS', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.PREACT,
                                    language: CustomScriptLanguage.TYPESCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,

                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('Svelte JS', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.SVELTE,
                                    language: CustomScriptLanguage.TYPESCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,

                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            describe('Vue JS', function () {
                var cfg = null;
                var init = function (collectsUserData, useCREPO) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cfg = {
                                    collectsUserData: collectsUserData,
                                    framework: CustomScriptFramework.VUE,
                                    language: CustomScriptLanguage.TYPESCRIPT,
                                    useCREPO: useCREPO,
                                    updated: new Date()
                                };
                                if (!(collectsUserData || useCREPO)) return [3 /*break*/, 2];
                                return [4 /*yield*/, setEnv({
                                        collectsConsumerData: collectsUserData,
                                        jotFormId: collectsUserData ? process.env.JOTFORM_ID : null
                                    }, {
                                        useCREPO: useCREPO,
                                        crepoAPIKeyProd: useCREPO
                                            ? process.env.CREPO_API_KEY_PRODUCTION
                                            : null,
                                        crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null
                                    })];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, setEnv({
                                    collectsConsumerData: collectsUserData,

                                    jotFormId: null
                                }, {
                                    useCREPO: useCREPO,
                                    crepoAPIKeyProd: null,
                                    crepoAPIKeyStg: null
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [4 /*yield*/, processConfig(cfg)];
                            case 5:
                                _a.sent();
                                execSync('npm run build', {
                                    stdio: 'pipe'
                                });
                                return [2 /*return*/];
                        }
                    });
                }); };
                it('should return the bundle.js - [user data, crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, bundleRequest, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    bundleRequest = _a.sent();
                                    bundleRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [user data]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormNotificationRequest, jotFormSubmissionData, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(true, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')
                                            .set('x-rba-rsa-signature-version', '1')
                                            .set('x-rba-rsa-signature-value', accountDeletionSignature)
                                            .send({
                                            userId: '61bf8e2142637d408aaf7f4a',
                                            date: '2021-12-19T19:55:33.096Z'
                                        })];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')
                                            .set('X-UIM-RSA-Signature-value', uimSignature)
                                            .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
                                            .send(uimPayload)];
                                case 5:
                                    jotFormNotificationRequest = _a.sent();
                                    jotFormNotificationRequest.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get("/uim/submission/" + uimPayload.siloUserId)
                                            .send()];
                                case 6:
                                    jotFormSubmissionData = _a.sent();
                                    jotFormSubmissionData.should.have.status(200);
                                    expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(JSON.stringify(uimPayload));
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')
                                            .send()];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - [crepo]', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, true)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(200);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                it('should return the bundle.js - []', function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var app, request, userDataRequest, jotFormUIMRequest, jotFormUIMSubmissionDataRequest, crepoRequest;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, init(false, false)];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, importFresh()];
                                case 2:
                                    app = _a.sent();
                                    return [4 /*yield*/, chai.request(app["default"]).get('/bundle.js')];
                                case 3:
                                    request = _a.sent();
                                    request.should.have.status(200);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/user/delete-data')];
                                case 4:
                                    userDataRequest = _a.sent();
                                    userDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .post('/uim/notification')];
                                case 5:
                                    jotFormUIMRequest = _a.sent();
                                    jotFormUIMRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/uim/submission/123')];
                                case 6:
                                    jotFormUIMSubmissionDataRequest = _a.sent();
                                    jotFormUIMSubmissionDataRequest.should.have.status(404);
                                    return [4 /*yield*/, chai
                                            .request(app["default"])
                                            .get('/api/resources/asd')];
                                case 7:
                                    crepoRequest = _a.sent();
                                    crepoRequest.should.have.status(404);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            });
            return [2 /*return*/];
        });
    });
});
// Reset to vanilla js
afterEach(function () {
    return __awaiter(this, void 0, void 0, function () {
        var cfg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cfg = {
                        collectsUserData: false,
                        framework: CustomScriptFramework.VANILLA,
                        language: CustomScriptLanguage.JAVASCRIPT,
                        useCREPO: false,
                        updated: new Date()
                    };
                    return [4 /*yield*/, setEnv({
                            collectsConsumerData: false,
                            jotFormId: null
                        }, {
                            useCREPO: false,
                            crepoAPIKeyProd: null,
                            crepoAPIKeyStg: null
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, processConfig(cfg)];
                case 2:
                    _a.sent();
                    execSync('npm run build', {
                        stdio: 'pipe'
                    });
                    return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=bundle.test.js.map