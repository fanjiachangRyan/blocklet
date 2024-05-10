import 'express-async-errors';

import path from 'path';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv-flow';
import express, { ErrorRequestHandler } from 'express';
import fallback from '@blocklet/sdk/lib/middlewares/fallback';

import logger from './libs/logger';
import routes from './routes';
import fs from 'fs';

dotenv.config();

const { name, version } = require('../../package.json');

export const app = express();

app.set('trust proxy', true);
app.use(cookieParser());
app.use(express.json({ limit: '1 mb' }));
app.use(express.urlencoded({ extended: true, limit: '1 mb' }));
app.use(cors());

const router = express.Router();
router.use('/api', routes);
app.use(router);

app.get('/getUser', (_, res) => {
  try {
    const jsonStr = fs.readFileSync(path.join(__dirname, './data.json'), 'utf-8');
    const jsonData = JSON.parse(jsonStr);

    res.send(JSON.stringify({ code: 0, data: jsonData, msg: 'success' }));
  } catch (e) {
    res.send(JSON.stringify({ code: -1, data: null, msg: 'error' }));
  }
});

app.post('/updateUser', (req, res) => {
  try {
    fs.writeFileSync(path.join(__dirname, './data.json'), JSON.stringify(req.body));

    res.send(JSON.stringify({ code: 0, data: null, msg: 'success' }));
  } catch (e) {
    res.send(JSON.stringify({ code: -1, data: null, msg: 'error' }));
  }
});

const isProduction = process.env.NODE_ENV === 'production' || process.env.ABT_NODE_SERVICE_ENV === 'production';

if (isProduction) {
  const staticDir = path.resolve(process.env.BLOCKLET_APP_DIR!, 'dist');
  app.use(express.static(staticDir, { maxAge: '30d', index: false }));
  app.use(fallback('index.html', { root: staticDir }));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use(<ErrorRequestHandler>((err, _req, res, _next) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
  }));
}

const port = parseInt(process.env.BLOCKLET_PORT!, 10);

export const server = app.listen(port, (err?: any) => {
  if (err) throw err;
  logger.info(`> ${name} v${version} ready on ${port}`);
});
