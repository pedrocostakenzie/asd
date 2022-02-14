import { NextFunction, Request, Response } from "express";
import { createProduct, findOneProudct, listAllProducts } from "../services/product.service";

export const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price } = req.body
    const product = await createProduct({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export const getOneProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params
    const product = await findOneProudct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await listAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}
