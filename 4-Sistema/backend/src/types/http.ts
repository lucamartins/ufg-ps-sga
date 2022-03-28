import { Request } from 'express';

export type THttpRequestLoggedUser = Request & {
  userId: string;
  userRole: string;
};

export type TStripeRequest = Request & {
  rawBody: any;
};
