import { CustomError } from './CustomError';
import { StatusCodes } from 'http-status-codes';

export class StateError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.CONFLICT);
  }
}
