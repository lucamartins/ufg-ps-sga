import { CustomError } from './CustomError';
import { StatusCodes } from 'http-status-codes';

export class AuthError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.NOT_FOUND);
  }
}
