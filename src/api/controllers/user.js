import User from '../models/user';
import {addDays} from "date-fns";
import crypto from "crypto";

exports.post = (req, res) => {
  if (req.body.level < req.user.level) {
    res.status(403).json({error: 'Users cannot be created with access level greater than your own'});
  } else {
    const data = Object.assign({}, req.body) || {};
    User.create(data, (err, user) => {
      if (err || !user) {
        res.status(500).json(err);
      } else {
        user.password = undefined;
        res.status(200).json(user);
      }
    });
  }
};

exports.put = (req, res) => {
  if (false && req.body.id !== req.user.email) { // @TODO fix
    res.status(403).json({error: 'You can only update your own user record'});
  } else {
    const query = { email: req.body.email };
    const update = {
      name: {
        first: req.body.name.first,
        last: req.body.name.last
      }
    };
    User.findOneAndUpdate(query, { $set: update }, {new: true}, (err, user) => {
      if (!user || err) {
        res.status(404).json({error: 'Could not update the record'});
      } else {
        res.status(201).json(user);
      }
    });
  }
};

exports.getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(users);
    }
  });
};

exports.resetPassword = (req, res) => {
  const query = { $and: [ { 'reset.expires': { $gt: new Date() } }, { 'reset.token': req.body.token } ] };
  const update = { 'password': req.body.password, reset: {} };
  User.findOneAndUpdate(query, update, (err, user) => {
    if (!user || err) {
      res.status(404).json({error: 'Reset token is not valid or has expired'});
    } else {
      res.status(201).json({result: 'Success'});
    }
  });
};

exports.resetToken = (req, res) => {
  let token = '';
  const expires = addDays(new Date(), 1);
  crypto.randomBytes(64, (err, buff) => {
    token = buff.toString('hex');
    const query = { email: req.query.email };
    const update = { reset: {expires: expires, token: token} };
    User.findOneAndUpdate(query, update, (err2, user) => {
      if (user) {
        const sgMail = req.app.get('sgMail');
        const msg = {
          to: user.email,
          from: 'test@example.com',
          subject: 'Password Reset Request',
          html: `<p>The token is ${token}</p>`
        };
        sgMail.send(msg);
      }
      res.status(200).json({result: 'Email sent'});
    });
  });
};
