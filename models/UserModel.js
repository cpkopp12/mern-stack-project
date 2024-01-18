// IMPORTS --------------------------------------
import mongoose from 'mongoose';

const UserSchema = new mongoose.UserSchema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// EXPORT MODEL ---------------------------------------
export default mongoose.model('User', UserSchema);
