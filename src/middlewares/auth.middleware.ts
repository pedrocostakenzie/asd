import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import Error from '../errors/custom.error';
import { User } from '../entities';
import { getRepository } from 'typeorm';

export const isAuthenticated = (req: Request|any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      next(new Error("Missing authorization headers", 401));
    }

    jwt.verify(token as string, process.env.SECRET as string, (err: any, decoded: any) => {
        if (err) {
            return next(new Error('Invalid or expired token', 401));
        }

        const userId = decoded.id;
        
        req.user = { id: userId };

        next();
    });
}

export const isSuperUser = async (req: Request|any, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: req.user.id
    },
    select: ["id", "isAdm"]
  });

  if (!user?.isAdm) {
    return next(new Error("Unauthorized", 401));
  }

  next();
}

export const userValidate = async (req: Request|any, res: Response, next: NextFunction) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: req.user.id
    },
    select: ["id", "isAdm"]
  });

  req.user = {...user}

  next();
}