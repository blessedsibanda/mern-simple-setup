import { MongoClient } from 'mongodb';
import devBundle from './devBundle'; // comment out this in production
import app from './express';
import config from '../config/config';

const url =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

MongoClient.connect(url, (err, db) => {
  console.log('Connected successfully to mongodb server');
  db.close();
});

devBundle.compile(app); // comment out this in production

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}.`);
});
