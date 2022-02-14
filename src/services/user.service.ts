import { getCustomRepository, getRepository } from "typeorm";
import { Cart, User } from "../entities";
import CustomError from "../errors/custom.error";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

interface IUser {
  email: string;
  password: string | undefined;
  name: string;
  isAdm: boolean;
}

export const createUser = async (body: IUser) => {
  try {
    const { email, password, name } = body;

    const userRepository = getRepository(User);
    const cartRepository = getRepository(Cart);

    if (!body.isAdm) {
      body.isAdm = false;
    }

    const user = userRepository.create({
      email,
      password,
      name,
      isAdm: body.isAdm,
    });
    
    await userRepository.save(user);

    const cart = cartRepository.create({
      owner: user
    });
    await cartRepository.save(cart);

    return {
      email: user.email,
      name: user.name,
      id: user.id,
      isAdm: user.isAdm,
      cart: [cart.id]
    };
  } catch (error) {
    throw new CustomError((error as any).message, 400);
  }
};

export const findOneUser = async (userId: string) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

  const user = await userRepository.findOne(userId);
  const carts = await cartRepository.find({
    where: {owner: user?.id}
  })

  const cartOpen = carts.filter(item => !item.paid).map(item => item.id)[0]
  const cartsClosed = carts.filter(item => item.paid).map(item => item.id)


  return {...user, cartOpen, cartsClosed};

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

export const generateRecoveryToken = async (email: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET as string, { expiresIn: 300 });

  return token;
}

export const changePassword = async (email: string, newPassword: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  if(!user) {
    throw new CustomError("User not found", 404);
  }

  newPassword = bcrypt.hashSync(newPassword, 10);

  await userRepository.save({...user, password: newPassword})
  
  return {"message": "your password has been changed"};
}