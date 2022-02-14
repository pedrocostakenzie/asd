import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities";
import { mailTemplateOptions, simpleMailOptions, transport } from "../services/email.service";

export const sendEmail = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const {subject, receiver, text} = req.body
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(req.user?.id);

    const options = simpleMailOptions(
      user?.email,
      receiver,
      subject,
      {text},
    );

    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        console.log(info);
      }
    });

    return res.status(200).json({"message": "email sent"});
  } catch (error) {
    next(error);
  }
};