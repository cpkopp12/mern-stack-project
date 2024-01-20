// IMPORTS ---------------------
import jwt from 'jsonwebtoken';

// CREATE TOKEN -------------------------
export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

// Verify TOKEN ----------------------------
export const verifyJWT = (token) => {
  const decodedJWT = jwt.verify(token, process.env.JWT_SECRET);
  return decodedJWT;
};
