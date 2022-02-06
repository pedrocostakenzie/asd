import { NextFunction, Request, Response } from "express";
import { createUser, findOneUser, listAllUsers, login } from "../services/user.service";

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, isAdm } = req.body
    const user = await createUser({ email, name, password, isAdm });
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const user = await findOneUser(id);
    res.json(user);
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
    const users = await login(email, password);
    res.json(users);
  } catch (error) {
    next(error);
  }
}