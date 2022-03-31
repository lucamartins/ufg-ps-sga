import { UnauthorizedError } from '../errors';

export const requireOwnership = (req, res, next) => {
  if (req.userRole === 'Admin' || req.params.id === req.userId) return next();
  throw new UnauthorizedError('Permissão ao recurso não concedida');
};
