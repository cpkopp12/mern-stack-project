// IMPORTS ----------------------------------
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword } from '../uitls/passwordUtils.js';

// EXPORT CONTROLLER FUNCTIONS -------------------------------------------
export const register = async (req, res) => {
  // first account registered = admin, following accounts = users
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  // encrypt password
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ mgs: 'user created' });
};

export const login = async (req, res) => {
  res.send('login');
};
