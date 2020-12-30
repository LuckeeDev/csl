// Main imports
import * as express from 'express';
import { environment as env } from '@environments/environment';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as fileUpload from 'express-fileupload';
import cookieSession from 'cookie-session';
import { webhookHandler } from '@config/webhook';
import * as http from 'http';
import * as io from 'socket.io';
import * as cors from 'cors';

import '@config/passport';
import { socketConfig } from '@config/socket';

// Routes
import admin from '@routes/admin';
import auth from '@routes/auth';
import upload from '@routes/upload';
import users from '@routes/users';
import articles from '@routes/articles';
import products from '@routes/products';
import orders from '@routes/orders';
import reports from '@routes/reports';
import snacks from '@routes/snacks';
import coge from '@routes/coge';
import commissioni from '@routes/commissioni';
import { saveError } from '@config/winston';

// Connect to database
mongoose.connect(env.DB_URI, {
  // Avoid deprecation warning
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${env.DB_URI}`);
});

mongoose.connection.on('error', (err: any) => {
  console.log(`Database error: ${err}`);
});

// Declare Express app
const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'https://cslussana-test.tk'],
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
app.use('/upload', upload);
app.use('/users', users);
app.use('/articles', articles);
app.use('/products', products);
app.use('/orders', orders);
app.use('/reports', reports);
app.use('/snacks', snacks);
app.use('/coge', coge);
app.use('/commissioni', commissioni);


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
