import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'Where are you going?! Seems like that route is out of orbit xD' });
};
