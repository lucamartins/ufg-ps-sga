import { UnauthorizedError } from '../errors';
import { Request, Response, NextFunction } from 'express';
import { THttpRequestLoggedUser } from '../types';

export const requireManager = (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as THttpRequestLoggedUser).userRole;
  if (userRole === 'Manager' || userRole === 'Admin') return next();
  throw new UnauthorizedError('Higher access level required');
};
