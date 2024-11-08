import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

const authService = {
  async register(data: { username: string; email: string; password: string }) {
    const user = new User(data);
    await user.save();
    return user;
  },

  async login(data: { email?: string; username?: string; password: string }) {
    const { email, username, password } = data;
    
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = await user.generateAuthToken();
    return { user, token };
  }
};

export default authService;
