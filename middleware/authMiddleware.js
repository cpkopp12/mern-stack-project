import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../uitls/tokenUtils.js';
// export autheticate user async func ---------------------------
export const authenticateUser = async (req, res, next) => {
  // destructure req.cookies for token
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('invalid authentication');
  }
  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (err) {
    throw new UnauthenticatedError('invalid authentication');
  }
};
