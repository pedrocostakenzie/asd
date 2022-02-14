import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/custom.error";
import { mailTemplateOptions, transport } from "../services/email.service";
import { changePassword, createUser, findOneUser, generateRecoveryToken, listAllUsers, login } from "../services/user.service";

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, isAdm } = req.body
    const user = await createUser({ email, name, password, isAdm });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export const getOneUser = async (req: Request|any, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params

    const user = await findOneUser(id);

    if (req.user.isAdm) {
      return res.json(user);
    }

    if (id !== req.user.id) {
      throw new CustomError("you only can view your profile", 401)
    } else {
      return res.json(user);
    }


  } catch (error) {
    next(error);
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const token = await login(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

export const generateToken = async (req: Request|any, res: Response, next: NextFunction) => {
  try {
    const {email} = req.body
    const token = await generateRecoveryToken(email);

    const options = mailTemplateOptions(
      [email],
      "Recuperação de senha",
      "recovery",
      {
        token
      },
    );

    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        console.log(info);
      }
    });

    res.json({message: `the token was sent to ${email}`});
  } catch (error) {
    next(error);
  }
}

export const passwordRecovery = async (req: Request|any, res: Response, next: NextFunction) => {
  try {
    const { email } = req.user
    const change = await changePassword(email, req.body.password)
    res.json(change);
  } catch (error) {
    next(error);
  }
}