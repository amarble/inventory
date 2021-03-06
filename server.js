import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const api = express();
api.use(bodyParser.json());

const mong = mongoose();
mong.connect(process.env.MONGODB_URI);
const db = mong.connection;
db.on('error', console.error.bind(console: 'connection error:'));
db.once('open', () => {
  api.listen(process.env.PORT || 8080, err => {
    fs.readdirSync(path.join(__dirname, 'src/api/routes')).map(file => {
      require('./routes' + file)(api);
    });
  });
});

/**
 * Generic error handler
 * @param res
 * @param reason
 * @param message
 * @param code
 */
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error': message});
}
