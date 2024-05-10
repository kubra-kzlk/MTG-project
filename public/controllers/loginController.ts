import { Request, Response } from 'express';
import { findUserByEmail } from '../db/database';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email en wachtwoord zijn vereist.");
  }

  const user : User = await findUserByEmail(email) as User;
  
  if (!user) {
    return res.render('login', {
      email: email,
      checkEmailandPassword: false,
    });
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.render('login',{
        email : email,
        checkEmailandPassword : false
    });
  }

  res.redirect('/main');
};