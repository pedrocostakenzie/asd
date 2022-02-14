import { NextFunction, Request, Response } from "express";
import CustomError from "../errors/custom.error";
import { addProduct, deleteProductInCart, findOneCart, listAllCarts } from "../services/cart.service";

export const postCartProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cartId, productId } = req.body
    const cartProduct = await addProduct({cartId, productId});
    res.status(201).json(cartProduct);
  } catch (error) {
    next(error);
  }
}

export const getOneCart = async (req: Request|any, res: Response, next: NextFunction) => {
  try {
    const {id} = req.params

    const cart = await findOneCart(id);

    if (req.user.isAdm) {
      return res.json(cart);
    }

    if (cart?.owner !== req.user.id) {
      throw new CustomError("you only can view your cart", 401)
    } else {
      return res.json(cart);
    }
  } catch (error) {
    next(error);
  }
}

export const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await listAllCarts();
    res.json(cart);
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req: Request|any, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params
    const response = await deleteProductInCart(productId, req.user);
    res.status(204).json(response);
  } catch (error) {
    next(error);
  }
}
