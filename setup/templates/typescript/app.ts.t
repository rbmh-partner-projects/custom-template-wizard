/// <reference path="./types.d.ts" />
/// <reference path="../custom-script/types.d.ts" />

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import fs from 'fs-extra';
import logger from 'morgan';
import path from 'path';

dotenv.config()

const app: Express = express()
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'))
}
app.use(
    cors({
        origin: true,
    })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(process.cwd(), './src/server/public')))

{{ if (it.useCREPO) { }}
const backendFile = './routes/graphql-api'
import(backendFile).then((backendRouter) => {
    app.use('/', backendRouter.default)
})
{{ } }}

{{ if (it.collectsUserData) { }}
const deleteCallbackFile = './routes/delete-user-data-callback'
import(deleteCallbackFile).then((userDataCallbackRouter) => {
    app.use('/', userDataCallbackRouter.default)
})
const jotFormRoutes = './routes/cdm-webhook-jotform'
import(jotFormRoutes).then((jotFormRoutesRouter) => {
    app.use('/', jotFormRoutesRouter.default)
})
{{ } }}

export default app
