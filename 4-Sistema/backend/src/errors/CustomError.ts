import { TCustomError } from '../types/error';

export class CustomError extends Error implements TCustomError {
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }

  statusCode: number;
}
