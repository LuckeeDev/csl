// Main imports
import * as express from 'express';
import { environment as env } from '@environments/environment';
import * as path from 'path';
import * as passport from 'passport';
import * as fileUpload from 'express-fileupload';
import cookieSession from 'cookie-session';
import { webhookHandler } from '@config/webhook';
import * as http from 'http';
import * as io from 'socket.io';
import * as cors from 'cors';
import '@config/passport';
import { socketConfig } from '@config/socket';
import { saveError } from '@config/winston';
import './app/db';

// Routes
import admin from '@routes/admin';
import auth from '@routes/auth';
import fire from '@routes/fire';
import upload from '@routes/upload';
import users from '@routes/users';
import articles from '@routes/articles';
import products from '@routes/products';
import orders from '@routes/orders';
import reports from '@routes/reports';
import snacks from '@routes/snacks';
import coge from '@routes/coge';
import commissioni from '@routes/commissioni';
import orientamento from '@routes/orientamento';


// Declare Express app
const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'https://cslussana.com', 'https://beta.cslussana.com'],
  credentials: true,
}));

// Cookie session middleware
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: env.COOKIE_KEYS,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Receive webhooks from Stripe [might need to add CORS, allowing Stripe, to this route]
app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  webhookHandler
);

// Read JSON requests
app.use(express.json());

// Enable file upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get('/api', (req, res) => {
  res.send('hi from the api');
});

// Routes
app.use('/admin', admin);
app.use('/auth', auth);
app.use('/fire', fire);
app.use('/upload', upload);
app.use('/users', users);
app.use('/articles', articles);
app.use('/products', products);
app.use('/orders', orders);
app.use('/reports', reports);
app.use('/snacks', snacks);
app.use('/coge', coge);
app.use('/commissioni', commissioni);
app.use('/orientamento', orientamento);


// Static folder
app.use(express.static(path.join(__dirname, 'assets')));
app.get('*', (req, res) => {
  res.redirect(env.client);
});

// Start server and socket
const port = env.PORT;
const server = http.createServer(app);
const socket = io(server, { path: '/api/socket' });

socketConfig(socket);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  saveError('UnhandledRejection occurred, check db for more details', {
    category: 'server',
    err,
  });
});

process.on('uncaughtException', (err) => {
  saveError('UnhandledException occurred, check db for more details', {
    category: 'server',
    err,
  });
});
