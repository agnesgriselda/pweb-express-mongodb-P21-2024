import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);

export default authRoutes;
