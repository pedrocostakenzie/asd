import { getRepository } from "typeorm";
import { Cart, User } from "../entities";
import CustomError from "../errors/custom.error";

export const buy = async (owner: string) => {
  const cartRepository = getRepository(Cart);
  const userRepository = getRepository(User);

  const user = await userRepository.findOne(owner);

  const carts = await cartRepository.find({
    where: {owner: user?.id}
  })

  const cart = carts.find(item => !item.paid)

  const paid = await cartRepository.save({...cart, paid: true})

  const newCart = cartRepository.create({
    owner: user
  });
  await cartRepository.save(newCart);

  return paid
}


export const findOneBuy = async (cartId: string) => {
  const cartRepository = getRepository(Cart);

  const buy = await cartRepository.findOne(cartId);
  if (!buy?.paid) {
    throw new CustomError("this cart has not been paid", 409)
  }

  return buy;
};

export const listAllBuys = async () => {
  const cartRepository = getRepository(Cart);

  const buys = await cartRepository.find({
    where: {paid: true}
  });

  return buys;
};