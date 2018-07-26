import User from '../models/user';

exports.get = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({error: 'Email or password incorrect'});
    } else {
      user.verifyPassword(req.body.password, (bErr, result) => {
        if (bErr || !result) {
          res.status(401).json({error: 'Email or password incorrect'});
        } else {
          res.status(200).json({token: 'Who wants a token?'});
        }
      });
    }
  });
};
