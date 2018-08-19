import Item from '../models/item';

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};
  Item.create(data, (err, item) => {
    if (err || !item) {
      res.status(500).json(err);
    } else {
      res.status(200).json(item);
    }
  });
};

exports.getAll = (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(items);
    }
  });
};
