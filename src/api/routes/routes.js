import AuthController from '../controllers/auth';
import UserController from '../controllers/user';

module.exports = api => {
  // Auth routes
  api.route('/auth/token').post(AuthController.post);
  // User routes
  api.route('/users').get(UserController.getAll);
  api.route('/users').post(UserController.post);
};
