import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';
import { ENV } from '../common/enums/app/app.js';
const register = async (req, res) => {
  try {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
     return res.status(400).json(errors.array());
   }
 
   const password = req.body.password;
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);
 
   const doc = new UserModel({
     email: req.body.email,
     fullName: req.body.fullName,
     avatarUrl: req.body.avatarUrl,
     passwordHash: hash,
   })
 
   const user = await doc.save();
 
   const token = jwt.sign({
     _id: user._id,
   },
      ENV.JWT.SECRET,
   {
     expiresIn: ENV.JWT.EXPIRES_IN,
   }
   );
 
   const { passwordHash, ...userData} = user._doc;
 
   res.json({
     ...userData,
     token
   });
 
  } catch (error) {
     console.log(error);
     res.status(500).json({
     message: 'Something was wrong'
   })
  }
 }

 const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email});

    if(!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if(!isValidPass) {
      return res.status(400).json({
        message: 'Invalid e-mail or password',
      })
    }

    const token = jwt.sign({
      _id: user._id,
    },
      ENV.JWT.SECRET,
    {
      expiresIn: ENV.JWT.EXPIRES_IN,
    }
    );

  const { passwordHash, ...userData} = user._doc;

  res.json({
    ...userData,
    token
  });

  } catch (error) {
    console.log(error);
    res.status(500).json({
    message: 'Authentication Unsuccessful'
  })
  }
}

const getMe = async (req ,res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'Couldn\'t find User'
      })
    }

  const { passwordHash, ...userData} = user._doc;

  res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
    message: 'Access denied'
  })
  }
}

export {register, getMe, login};