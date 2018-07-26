import AuthController from '../controllers/auth';
import UserController from '../controllers/user';

module.exports = api => {
  // Auth routes
  api.route('/auth/:email/:password').get(AuthController.get);
  // User routes
  api.route('/users').post(UserController.post);
};
