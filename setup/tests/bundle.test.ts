import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import {execSync} from 'child_process'
import dotenv from 'dotenv'
import fs from 'fs-extra'
import {afterEach, describe, it} from 'mocha'
import path from 'path'

import {processConfig, setEnv} from '../index'
import {CustomScriptConfig} from '../types'
import {CustomScriptFramework, CustomScriptLanguage} from '../types/enum'
import uimPayload from './resources/uim_payload.json' assert {type: "json"}  

dotenv.config()

process.env.NODE_ENV = 'test'

chai.use(chaiHttp)
chai.should()

async function importFresh() {
  // we are loading a javascript module
  let newFileName = `app${Date.now()}`

  const javaScriptFile = path.join(process.cwd(), 'src', 'server', 'app.js')
  const typeScriptFile = path.join(process.cwd(), 'src', 'server', 'app.ts')

  if (fs.existsSync(javaScriptFile)) {
    fs.renameSync(
        javaScriptFile,
        path.join(process.cwd(), 'src', 'server', newFileName + '.js')
    )
    newFileName += '.js'
  } else {
    fs.renameSync(
        typeScriptFile,
        path.join(process.cwd(), 'src', 'server', newFileName + '.ts')
    )
    newFileName += '.ts'
  }

  return await import(`../../src/server/${newFileName}`)
}

const accountDeletionSignature =
    'YQ97dyoBwJC9VDwkylWqJVq0M/48LId7QVjQnIW4R6z8QdlNvQ5+26XbOh5ZCdm465irUPpCGyOa9092qMJYHefzenokIsIdaGCezPFcL7fww3o5FkGa76qMP2Htgrx/vO9CJrgqg9JT8nTurFOCLSKpAlGkv7LtYZmfYvjIJFR62umW1NXAM1PtCj5nEQFnze6R+yXGemuM+hXqni9x9HvpXpHxkUhV6r1HBFJ0Os5kShe6gxhO7zarfoBzHXaeQ+8M7Wp4HEAT/LhDFJG1UTHJu6KpnZxYDcxRIflPYj1mFGQDzroFCCbRgjKMD9NeVx69wvbMsnxqs9QfXCFWKA=='

const uimSignature =
    'qtBSUvCcZU2IyxybBJBtV7+iOl9HaTe9ERmro/k7bNPJXiPw2C4c0PXQkwoA4N4frRBhyg6oPojG9ZPMv7QmumbOKSNvjFF1aSkZXL3+lS3xMmXr7g/MqJTxz0oBDLm1u5rfnmOPNy2DQ7VYbsLd6sRqq8r4UgYNczi3u0P7X5yyBqjNnMAF0guAYJaUJ0DcomSmpcBy8sB+uSy+d7/ASFyFh2PFr4YtMAxTLkqLlxcln4D/j2bRNnX2rpLMsQiuvSO1adJKeK6KYWvQK6O65SQJ7EZ8slQdpxoQLaOeQjiIoyqIxv8fOuVa6ZyYNa4Sau4N6lXhqfALp1TzcGUByw=='

describe('JavaScript', async function () {
  describe('Vanilla', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (
        collectsUserData: boolean,
        useCREPO: boolean
    ): Promise<void> => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.VANILLA,
        language: CustomScriptLanguage.JAVASCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })

  describe('Preact JS', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (
        collectsUserData: boolean,
        useCREPO: boolean
    ): Promise<void> => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.PREACT,
        language: CustomScriptLanguage.JAVASCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })

  describe('Svelte JS', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (collectsUserData: boolean, useCREPO: boolean) => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.SVELTE,
        language: CustomScriptLanguage.JAVASCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })

  describe('Vue JS', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (collectsUserData: boolean, useCREPO: boolean) => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.VUE,
        language: CustomScriptLanguage.JAVASCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })
})

describe('Typescript', async function () {
  describe('Vanilla', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (collectsUserData: boolean, useCREPO: boolean) => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.VANILLA,
        language: CustomScriptLanguage.TYPESCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })

  describe('Preact JS', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (collectsUserData: boolean, useCREPO: boolean) => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.PREACT,
        language: CustomScriptLanguage.TYPESCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })

  describe('Svelte JS', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (collectsUserData: boolean, useCREPO: boolean) => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.SVELTE,
        language: CustomScriptLanguage.TYPESCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })

  describe('Vue JS', () => {
    let cfg: CustomScriptConfig | null = null

    const init = async (collectsUserData: boolean, useCREPO: boolean) => {
      cfg = {
        collectsUserData,
        framework: CustomScriptFramework.VUE,
        language: CustomScriptLanguage.TYPESCRIPT,
        useCREPO,
        updated: new Date(),
      }

      if (collectsUserData || useCREPO) {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_PRODUCTION
                  : null,
              rbAccountTokenStg: collectsUserData
                  ? process.env.REDBULL_ACCOUNT_TOKEN_STAGING
                  : null,
              jotFormId: collectsUserData ? process.env.JOTFORM_ID : null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: useCREPO
                  ? process.env.CREPO_API_KEY_PRODUCTION
                  : null,
              crepoAPIKeyStg: useCREPO ? process.env.CREPO_API_KEY_STAGING : null,
            }
        )
      } else {
        await setEnv(
            {
              collectsConsumerData: collectsUserData,
              rbAccountTokenProd: null,
              rbAccountTokenStg: null,
              jotFormId: null,
            },
            {
              useCREPO: useCREPO,
              crepoAPIKeyProd: null,
              crepoAPIKeyStg: null,
            }
        )
      }

      await processConfig(cfg)
      execSync('npm run build', {
        stdio: 'pipe',
      })
    }

    it('should return the bundle.js - [user data, crepo]', async function () {
      await init(true, true)

      const app: any = await importFresh()

      const bundleRequest = await chai.request(app.default).get('/bundle.js')
      bundleRequest.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )
          .send()

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - [user data]', async function () {
      await init(true, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')
          .set('x-rba-rsa-signature-version', '1')
          .set('x-rba-rsa-signature-value', accountDeletionSignature)
          .send({
            userId: '61bf8e2142637d408aaf7f4a',
            date: '2021-12-19T19:55:33.096Z',
          })

      userDataRequest.should.have.status(200)

      // check jotform
      const jotFormNotificationRequest = await chai
          .request(app.default)
          .post('/uim/notification')
          .set('X-UIM-RSA-Signature-value', uimSignature)
          .set('X-UIM-RSA-Signature-version', 'rbsilo-design-20220112')
          .send(uimPayload)

      jotFormNotificationRequest.should.have.status(200)

      // check if posted notification was stored to fake database
      const jotFormSubmissionData = await chai
          .request(app.default)
          .get(`/uim/submission/${uimPayload.siloUserId}`)
          .send()

      jotFormSubmissionData.should.have.status(200)
      expect(JSON.stringify(jotFormSubmissionData.body)).to.equal(
          JSON.stringify(uimPayload)
      )

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')
          .send()

      crepoRequest.should.have.status(404)
    })

    it('should return the bundle.js - [crepo]', async function () {
      await init(false, true)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      // since we have not defined an API key, we can only check if the endpoint was exposed
      const crepoRequest = await chai
          .request(app.default)
          .get(
              '/api/resources/rrn:content:live-videos:bc896bee-4bb9-48b5-b9d3-b74fc8990079:en-INT'
          )

      crepoRequest.should.have.status(200)
    })

    it('should return the bundle.js - []', async function () {
      await init(false, false)

      const app: any = await importFresh()

      const request = await chai.request(app.default).get('/bundle.js')

      request.should.have.status(200)

      const userDataRequest = await chai
          .request(app.default)
          .post('/user/delete-data')

      userDataRequest.should.have.status(404)

      const jotFormUIMRequest = await chai
          .request(app.default)
          .post('/uim/notification')

      jotFormUIMRequest.should.have.status(404)

      const jotFormUIMSubmissionDataRequest = await chai
          .request(app.default)
          .get('/uim/submission/123')

      jotFormUIMSubmissionDataRequest.should.have.status(404)

      const crepoRequest = await chai
          .request(app.default)
          .get('/api/resources/asd')

      crepoRequest.should.have.status(404)
    })
  })
})

// Reset to vanilla js
afterEach(async function () {
  const cfg: CustomScriptConfig = {
    collectsUserData: false,
    framework: CustomScriptFramework.VANILLA,
    language: CustomScriptLanguage.JAVASCRIPT,
    useCREPO: false,
    updated: new Date(),
  }

  await setEnv(
      {
        collectsConsumerData: false,
        rbAccountTokenProd: null,
        rbAccountTokenStg: null,
        jotFormId: null,
      },
      {
        useCREPO: false,
        crepoAPIKeyProd: null,
        crepoAPIKeyStg: null,
      }
  )

  await processConfig(cfg)
  execSync('npm run build', {
    stdio: 'pipe',
  })
})