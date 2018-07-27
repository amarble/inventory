require('./utils/db');
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import cors from 'cors';

const api = express();

api.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

api.use(bodyParser.json());
api.use(jwt({ secret: process.env.JWT_SECRET })).unless({
  path: [
    '/auth/token'
  ]
});

api.listen(process.env.PORT || 8080, err => {
  if (err) {
    process.exit(1);
  }

  fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(api);
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
