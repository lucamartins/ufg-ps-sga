import { CustomError } from './CustomError';
import { StatusCodes } from 'http-status-codes';

export class UnauthorizedError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.FORBIDDEN);
  }
}
