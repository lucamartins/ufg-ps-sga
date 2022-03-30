import { Request, Response } from 'express';
import { IReqAuth } from './';

export type TCrudController = {
  create: (req: Request, res: Response) => Promise<Response>;
  getAll: (req: Request, res: Response) => Promise<Response>;
  getOne: (req: Request, res: Response) => Promise<Response>;
  updateOne: (req: IReqAuth, res: Response) => Promise<Response>;
  deleteOne: (req: Request, res: Response) => Promise<Response>;
};

export type TAuthController = {
  login: (req: Request, res: Response) => Promise<Response>;
  logout: (req: Request, res: Response) => Promise<Response>;
  verifyState: (req: Request, res: Response) => Promise<Response>;
};

export type TStripeController = {
  generateCustomerPortal: (req: Request, res: Response) => Promise<Response>;
  webhooks: (req: Request, res: Response) => Promise<Response>;
};

export type TGymDayController = TCrudController & {
  generateTargetDays: (req: Request, res: Response) => Promise<Response>;
  modifySchedule: (req: Request, res: Response) => Promise<Response>;
};
