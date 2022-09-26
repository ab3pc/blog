import { body } from 'express-validator';

const postCreateValidation = [
  body('title', 'Enter title').isLength({min: 3}).isString(),
  body('text', 'Enter some text').isLength({ min: 10}).isString(),
  body('tags', 'Invalid tags format(Must be an array)').optional().isString(),
  body('imageUrl', 'Invalid image URL').optional().isString(),
]

export { postCreateValidation };