import { CustomError } from './CustomError';
import { StatusCodes } from 'http-status-codes';

export class UnauthenticatedError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.UNAUTHORIZED);
  }
}
