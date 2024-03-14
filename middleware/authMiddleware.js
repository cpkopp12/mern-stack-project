import {
  UnauthenticatedError,
  Unauthorized,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../uitls/tokenUtils.js";
// export autheticate user async func ---------------------------
export const authenticateUser = (req, res, next) => {
  // destructure req.cookies for token
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("invalid authentication");
  }
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "65f33a2d10a25dfa66033f44";
    req.user = { userId, role, testUser };
    next();
  } catch (err) {
    throw new UnauthenticatedError("invalid authentication");
  }
};

export const authorizePermissions = (...rest) => {
  return (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      throw new Unauthorized("user not authorized for this route");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User, Read Only");
  }
  next();
};
