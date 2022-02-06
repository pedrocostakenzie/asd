import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../entities";
import CustomError from "../errors/custom.error";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

interface UserBody {
  email: string;
  password: string;
  name: string;
  isAdm: boolean;
}

export const createUser = async (body: UserBody) => {
  try {
    const { email, password, name, isAdm } = body;

    const userRepository = getRepository(User);

    const user = userRepository.create({
      email,
      password,
      name,
      isAdm,
    });

    await userRepository.save(user);

    return {
      email: user.email,
      name: user.name,
      id: user.id,
      isAdm: user.isAdm,
    };
  } catch (error) {
    throw new CustomError((error as any).message, 400);
  }
};

export const findOneUser = async (userId: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(userId);

  return user;

}

export const listAllUsers = async () => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return users;

}

export const login = async (email: string, password: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new CustomError("Wrong email/password", 401);
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET as string, { expiresIn: "1d" });

  return token;
}