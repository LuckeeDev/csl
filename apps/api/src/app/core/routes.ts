import { Application, static as staticPath } from 'express';
import { join } from 'path';
import { environment as env } from '@environments/environment';

import {
  admin,
  articles,
  auth,
  coge,
  commissioni,
  fire,
  orientamento,
  orders,
  products,
  reports,
  snacks,
  upload,
  users,
} from '@routes';

export function setupRoutes(app: Application) {
  // Setup main routes
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
  app.use(staticPath(join(__dirname, 'assets')));

  // Fallback to client
  app.get('*', (req, res) => {
    res.redirect(env.client);
  });
}
