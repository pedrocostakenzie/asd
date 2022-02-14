import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities";
import CustomError from "../errors/custom.error";
import { buy, findOneBuy, listAllBuys } from "../services/buy.service";
import { mailTemplateOptions, transport } from "../services/email.service";

export const buyCart = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = getRepository(User);

    const cartPaid = await buy(req.user);

    const user = await userRepository.findOne(req.user?.id);

    const options = mailTemplateOptions(
      [user?.email],
      "Confirmação de Compra",
      "buy",
      {
        name: user?.name,
        cartId: cartPaid.id,
        price: cartPaid.total
      },
    );

    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        console.log(info);
      }
    });

    return res.status(201).json(cartPaid);
  } catch (error) {
    next(error);
  }
};

export const getOneBuy = async (
  req: Request|any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cartId } = req.params;
    const buy = await findOneBuy(cartId);
    
    if (req.user?.isAdm) {
      return res.json(buy);
    }
    if (buy?.owner !== req.user.id) {
      throw new CustomError("you only can view your buys", 401)
    } else {
      return res.json(buy);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllBuys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await listAllBuys();
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
