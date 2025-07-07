
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../model/User.js";
import tryCatch from './utils/tryCatch.js';
import Room from '../model/Room.js'

export const register = tryCatch (async (req, res) => {
 
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be six characters or more.' });
    }

    const emailLowerCase = email.toLowerCase();

    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser) {
      return res.status(400).json({ success: false, message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: emailLowerCase,
      password: hashedPassword,
    });

    const { _id: id, photoURL } = user;
    const token = jwt.sign({ id, name, photoURL}, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      result: { id, name, email: emailLowerCase, photoURL, token },
    });
 

});

export const login = tryCatch(async(req, res)=>{


  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required!' });
  }


  const emailLowerCase = email.toLowerCase();

  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser) {
    return res.status(404).json({ success: false, message: 'User does not exists!' });
  }

  const correctPassword = await bcrypt.compare(password, existedUser.password);
  if(!correctPassword) return res.status(400).json({success:false, message:'Invalid credentials'});


  const { _id: id, name, photoURL } = existedUser;
  const token = jwt.sign({ id, name, photoURL}, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    success: true,
    result: { id, name, emailLowerCase: emailLowerCase, photoURL, token },
  });

})

export const updateProfile = tryCatch(async(req, res) =>{
      const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new:true});
      
      const {_id: id, name, photoURL} = updatedUser;

      // To do Updation of the rooms record added by this user
      await Room.updateMany ({ uid: id}, {uName: name, uPhoto: photoURL});

      const token = jwt.sign({ id, name, photoURL}, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({success: true, result: {name, photoURL, token}});
      
});


export const getUsers = tryCatch( async (req, res) => {
    const users = await User.find().sort({_id: -1});
    res.status(200).json({success: true, result: users});

});