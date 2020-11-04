import mongoose, { mongo } from 'mongoose';
import devBundle from './devBundle'; // comment out this in production
import app from './express';
import config from '../config/config';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

devBundle.compile(app); // comment out this in production

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}.`);
});
