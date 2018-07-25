const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const ObjectID = mongodb.ObjectID;

const USERS_COLLECTION = 'users';

const app = express();
app.use(bodyParser.json());

let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, (error, client) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  db = client.db();
  console.log('Database connection successful');

  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log('Application running on port', port);
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

// Authentication routes

app.get('/api/token/:login/:password', (req, res) => {
  db.collection(USERS_COLLECTION).findOne({login: req.params.login}, (err, doc) => {
    if (err || !doc) {
      handleError(res, err.message, 'Login or password is incorrect');
    } else {
      bcrypt.compare(req.params.password, doc.password, (errBcrypt, result) => {
        if (errBcrypt || !result) {
          handleError(res, errBcrypt.message, 'Login or password is incorrect');
        } else {
          delete doc.password;
          res.status(200).json(doc);
        }
      });
    }
  });
});

// User routes

app.post('/api/user', (req, res) => {
  const newUser = req.body;

  if (!req.body.login || !req.body.password) {
    handleError(res, 'Invalid input', 'Must provide a login and password', 400);
  } else {
    bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
      if (errBcrypt) {
        handleError(res, errBcrypt.message, 'There was an error creating the new user');
      } else {
        newUser.password = hash;
        db.collection(USERS_COLLECTION).insertOne(newUser, (err, doc) => {
          if (err) {
            handleError(res, err.message, 'There was an error creating the new user');
          } else {
            res.status(201).json(doc.ops[0]);
          }
        });
      }
    });
  }
});
