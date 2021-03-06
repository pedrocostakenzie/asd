import { getRepository } from "typeorm";
import { Product } from "../entities";
import CustomError from "../errors/custom.error";

interface IProduct {
  name: string;
  description: string;
  price: number;
}

export const createProduct = async (body: IProduct) => {
  try {
    const { name, description, price } = body;

    const productRepository = getRepository(Product);

    const product = productRepository.create({
      name,
      description,
      price,
    });

    await productRepository.save(product);

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    };
  } catch (error) {
    throw new CustomError((error as any).message, 400);
  }
};

export const findOneProudct = async (productId: string) => {
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(productId);

  return product;
};

export const listAllProducts = async () => {
  const productRepository = getRepository(Product);

  const product = await productRepository.find();

  return product;
};
