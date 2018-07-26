import User from '../models/user';

exports.post = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    const data = Object.assign({}, req.body, {user: req.user.sub}) || {};

    User.create(data, (err, user) => {
      if (err || !user) {
        res.status(500).json(err);
      } else {
        user.password = undefined;
        res.status(200).json(user);
      }
    });
  });
};
