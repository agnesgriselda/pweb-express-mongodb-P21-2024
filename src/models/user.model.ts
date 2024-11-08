import mongoose, { Document, Schema } from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tokens: { token: string }[];
  generateAuthToken(): Promise<string>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{ token: { type: String, required: true } }],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.tokens;

  return user;
}

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model<IUser>('User', userSchema);

export type { IUser };
export { User };
