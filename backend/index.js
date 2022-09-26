import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from 'cors';

import { registerValidation, loginValidation, postCreateValidation } from './validations/validations.js';
import { ENV } from './common/enums/app/app.js';
import { checkAuth, handleValidationErrors } from './utils/utils.js';
import { UserController, PostController} from './controllers/controllers.js';

mongoose.connect(
  ENV.DB.CONNECTION_STRING)
  .then(() => console.log('DB OK'))
  .catch((err) => console.log('DB Error', err));
 
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_,file,cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage })

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',loginValidation, handleValidationErrors,UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id',checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, postCreateValidation, handleValidationErrors,PostController.update);

app.listen(3333, (err) => {
  if(err) {
    console.log(err);
  }

  console.log('serv ok');
});
