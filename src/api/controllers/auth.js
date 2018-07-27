import User from '../models/user';
import jwt from 'jsonwebtoken';

exports.post = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({error: 'Email or password incorrect'});
    } else {
      user.verifyPassword(req.body.password, (bErr, result) => {
        if (bErr || !result) {
          res.status(401).json({error: 'Email or password incorrect'});
        } else {
          const token = jwt.sign(
            { id: user._id, userLevel: user.userLevel },
            process.env.JWT_SECRET,
            { expiresIn: 86400 });
          res.status(200).send( {auth: true, token: token} );
        }
      });
    }
  });
};
