import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Invalid email address').isEmail(),
  body('password', 'Password should be at least 5 characters').isLength({ min: 5}),
  body('fullName', ' Enter your name, please').isLength({ min: 3}),
  body('avatarUrl', 'Invalid Avatar URL ').optional().isURL(),
]

export const loginValidation = [
  body('email', 'Invalid email address').isEmail(),
  body('password', 'Password should be at least 5 characters').isLength({ min: 5}),
]