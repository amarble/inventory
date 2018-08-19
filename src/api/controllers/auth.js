import User from '../models/user';
import jwt from 'jsonwebtoken';
import { isBefore } from 'date-fns';

exports.post = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({error: 'Email or password incorrect'});
    } else {
      user.verifyPassword(req.body.password, (bErr, result) => {
        if (bErr || !result) {
          res.status(401).json({error: 'Email or password incorrect'});
        } else {
          delete user.password;
          delete user.reset;
          const token = jwt.sign(
            { id: user._id, level: user.level },
            process.env.JWT_SECRET,
            { expiresIn: 86400 });
          res.status(200).send( {auth: true, token: token, user: user} );
        }
      });
    }
  });
};

exports.get = (req, res) => {
  User.findOne({ 'reset.token': req.query.token }, (err, user) => {
    if (err || !user) {
      res.status(404).json({error: 'Invalid reset token'});
    } else {
      if (isBefore(new Date(user.reset.expires), new Date())) {
        res.status(404).json({error: 'Invalid reset token'});
      } else {
        res.status(200).json({message: 'Valid reset token'});
      }
    }
  });
};
