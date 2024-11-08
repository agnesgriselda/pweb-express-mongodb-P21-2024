import { Request, Response } from 'express';
import authService from '../services/auth.service';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register({ username, email, password });
    res.status(201).send({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        }
      }
    })
  } catch (error: any) {
    if (error.code === 11000 && error.keyValue?.email) {
      res.status(400).send({
        status: 'failed',
        message: 'Email already exists'
      });
    } else if (error.code === 11000 && error.keyValue?.username) {
      res.status(400).send({
        status: 'failed',
        message: 'Username already exists'
      });
    } else {
      res.status(400).send({
        status: 'failed',
        message: error.message
      });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    if (email && username) {
      throw new Error('Please provide only either username or email');
    }

    const { user, token } = await authService.login({ email, username, password });

    res.status(200).send({
      status: 'success',
      message: 'Login success',
      data: {
        user: {
          username: user.username,
          email: user.email,
        },
        token,
      }
    });
  } catch (error: any) {
    res.status(400).send({
      status: 'failed',
      message: error.message
    });
  }
};
