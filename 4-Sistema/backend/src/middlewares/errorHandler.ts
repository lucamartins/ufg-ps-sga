import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong, try again later', err });
};
