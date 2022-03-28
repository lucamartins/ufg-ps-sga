import { UnauthorizedError } from '../errors';
import { Request, Response, NextFunction } from 'express';
import { THttpRequestLoggedUser } from '../types';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.userRole;
  if (userRole === 'Admin') return next();
  throw new UnauthorizedError('Um nível superior de acesso é requerido');
};
