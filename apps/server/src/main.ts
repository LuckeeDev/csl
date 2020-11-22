// Main imports
import { environment as env } from '@environments/environment';

import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as fileUpload from 'express-fileupload';
import cookieSession from 'cookie-session';
import { webhookHandler } from '@config/webhook';
import * as http from 'http';
import * as io from 'socket.io';

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

// Cookie session middleware
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: env.COOKIE_KEYS,
  })
);

// CORS middleware
app.use(cors());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Receive webhooks from Stripe
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

// Routes
app.use('/api/admin', admin);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/reports', reports);
app.use('/api/snacks', snacks);
app.use('/api/coge', coge);
app.use('/api/commissioni', commissioni);

// Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server and socket
const port = env.PORT;
const server = http.createServer(app);
const socket = io(server, { path: '/api/socket' });

socketConfig(socket);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
