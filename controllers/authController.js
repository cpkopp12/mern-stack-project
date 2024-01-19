// IMPORTS ----------------------------------
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../uitls/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../uitls/tokenUtils.js';

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
  const user = await User.findOne({ email: req.body.email });
  // check email
  if (!user) {
    throw new UnauthenticatedError('invalid credentials');
  }
  // check password
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('invalid credentials');
  }

  // jwt token
  const token = createJWT({ userId: user._id, role: user.role });

  res.json({ token });
};
