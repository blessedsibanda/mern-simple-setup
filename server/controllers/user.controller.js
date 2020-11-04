import User from '../models/user.model';
import errorHandler from '../helpers/dbErrorHandler';

const list = async (req, res) => {};
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
const update = async (req, res) => {};
const read = async (req, res) => {};
const remove = async (req, res) => {};
const userById = async (req, res, next) => {};

export default { list, create, update, read, remove, userById };
