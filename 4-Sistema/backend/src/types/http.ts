import { Request } from 'express';

export interface IReqAuth extends Request {
  userId: string;
  userRole: 'Admin' | 'Customer';
}

export type TStripeRequest = Request & {
  rawBody: any;
};
