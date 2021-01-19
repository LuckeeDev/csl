import * as express from 'express';
import { setupErrors } from './errors';
import { setupDB } from './db';
import { setupApp } from './app';
import { setupPassport } from './passport';
import { setupRoutes } from './routes';

setupErrors();

setupDB();

const app = express();

setupApp(app);

setupPassport();

setupRoutes(app);

export { app };
