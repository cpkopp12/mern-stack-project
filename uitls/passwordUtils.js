// IMPORTS ---------------------------------
import bcrypt from 'bcryptjs';

// bcryptjs encrypt password ---------------------
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

// compare passwords ----------------------------------
export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
