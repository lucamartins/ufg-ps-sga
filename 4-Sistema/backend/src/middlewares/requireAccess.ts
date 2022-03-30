import { UnauthenticatedError } from '../errors';
import { Request, Response, NextFunction } from 'express';

export const requireAccess = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id === req.userId);
  if (req.userRole === 'Admin' || req.params.id === req.userId) return next();
  throw new UnauthenticatedError('É necessário ser admin ou proprietário do recurso');
};
