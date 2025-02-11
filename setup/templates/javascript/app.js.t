import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs-extra';
import logger from 'morgan';
import path from 'path';

const app = express();
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(cors({
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), './src/server/public')));

{{ if (it.useCREPO) { }}
const test = await import('./routes/graphql-api.js');
app.use('/', test.default.init());
{{ } }}

{{ if (it.collectsUserData) { }}
const userDataCallbackRouter = await import('./routes/delete-user-data-callback.js');
app.use('/', userDataCallbackRouter.default.init());
const jotFormRoutes = await import('./routes/cdm-webhook-jotform.js')
app.use('/', jotFormRoutes.default.init());
{{ } }}

export default app
