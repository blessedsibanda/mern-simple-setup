import { extend } from 'lodash';
import User from '../models/user.model';
import errorHandler from '../helpers/errorHandler';

const list = async (req, res) => {
  try {
    let users = await User.find().select('-hashed_password -salt');
    return res.json(users);
  } catch (err) {
    error: errorHandler.getErrorMessage(err);
  }
};
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.json({
      message: 'Successfully signed up!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const read = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { list, create, update, read, remove, userById };
