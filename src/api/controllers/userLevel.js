import UserLevel from '../models/userLevel';

exports.getAll = (req, res) => {
  UserLevel.find({}, (err, userLevels) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(userLevels);
    }
  });
}
