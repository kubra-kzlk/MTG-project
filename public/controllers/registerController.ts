import { Request, Response } from 'express';
import { NewUser, User } from '../models/user';
import { createUser } from '../db/database';

export const register = async (req: Request, res: Response) => {
  const { email, password, 'password-confirm': passwordConfirm } = req.body;

  let emailIsAlreadryInUse = false;
  let passwordLengthError = false;
  let passwordMatchError = false;

  if (!email || !password || !passwordConfirm) {
    return res.status(400).send({ error: 'All felden zijn verplicht' });
  }

  if (password !== passwordConfirm) {
    passwordMatchError = true;
  }

  if (!isValidPassword(password)) {
    passwordLengthError = true;
  }

  if (passwordLengthError || passwordMatchError) {
    return res.render('register', {
      userEmailExists: emailIsAlreadryInUse,
      passwordLengthError: passwordLengthError,
      passwordMatchError: passwordMatchError,
      email: email
    });
  }

  try {
    const newUser: NewUser = { email, password };
    const user: User = await createUser(newUser);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    emailIsAlreadryInUse = true;
    res.render('register', {
      userEmailExists: emailIsAlreadryInUse,
      passwordLengthError: passwordLengthError,
      passwordMatchError: passwordMatchError,
      email: email
    });
  }
};

const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[0-9]).{4,}$/;
  return passwordRegex.test(password);
}