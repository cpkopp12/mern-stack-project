import { UnauthenticatedError, Unauthorized } from '../errors/customErrors.js';
import { verifyJWT } from '../uitls/tokenUtils.js';
// export autheticate user async func ---------------------------
export const authenticateUser = (req, res, next) => {
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

export const authorizePermissions = (...rest) => {
  return (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      throw new Unauthorized('user not authorized for this route');
    }
    next();
  };
};
