import { StatusCodes } from 'http-status-codes';
import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.BAD_REQUEST);
  }
}
