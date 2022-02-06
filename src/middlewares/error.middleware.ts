import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/custom.error';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}
