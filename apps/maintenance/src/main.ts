import * as express from 'express';
import { join } from 'path';

const app = express();

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Maintenance started on port 3000`);
});
