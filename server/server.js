import express from 'express';
import path from 'path';
import template from './../template';

const CURRENT_WORKING_DIR = process.cwd();

import devBundle from './devBundle'; // comment out this in production

const app = express();

devBundle.compile(app); // comment out this in production

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${port}.`);
});
