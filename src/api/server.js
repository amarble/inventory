require('./utils/db');
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

const api = express();

api.use(cors());

api.use(bodyParser.json());

api.use(jwt({ secret: process.env.JWT_SECRET, getToken: function (req) {
  console.log(req.headers.authorization);
  return req.headers.authorization.split(' ')[1];
  } }).unless({
  path: [
    '/auth/token',
    '/users/resetPassword'
  ]
}));

api.listen(process.env.PORT || 8080, err => {
  if (err) {
    process.exit(1);
  }

  fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
    require('./routes/' + file)(api);
  });
});

api.use((error, req, res, next) => {
  if (error) {
    handleError(res, error.code, error.message, error.status);
  } else {
    next();
  }
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
api.set('sgMail', sgMail);


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
