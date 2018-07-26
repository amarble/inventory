import User from '../models/user';

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};

  User.create(data, (err, user) => {
    if (err || !user) {
      res.status(500).json(err);
    } else {
      user.password = undefined;
      res.status(200).json(user);
    }
  });
};
