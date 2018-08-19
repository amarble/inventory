import AuthController from '../controllers/auth';
import ItemController from '../controllers/item';
import UserController from '../controllers/user';
import UserLevelController from '../controllers/userLevel';

module.exports = api => {
  // Auth routes
  api.route('/auth/token').post(AuthController.post); // Create a new JWT token (log in)
  api.route('/auth/token').get(AuthController.get); // Validate a password reset token
  // User routes
  api.route('/users').get(UserController.getAll); // Get all users
  api.route('/users').post(UserController.post); // Create a new user
  api.route('/users').put(UserController.put); // Update a user
  api.route('/users/resetPassword').get(UserController.resetToken); // Requests a user password reset
  api.route('/users/resetPassword').post(UserController.resetPassword); // Resets user password
  // UserLevel routes
  api.route('/userLevels').get(UserLevelController.getAll); // Get all user levels
  // Item routes
  api.route('/items').get(ItemController.getAll); // Get all items
  api.route('/items').post(ItemController.post); // Create a new item
};
