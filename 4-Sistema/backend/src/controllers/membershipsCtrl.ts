import { StatusCodes } from 'http-status-codes';
import { Membership, Plan, Customer } from '../models';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { isReqEmptyBody } from '../utils';
import { Request, Response } from 'express';
import { TCrudController, IReqAuth } from '../types';

class MembershipCtrl {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição não pode ser vazio');

    const { customerId, planId } = req.body;
    console.log(customerId, planId);

    // Check if the plan and the customer exists
    const plan = await Plan.findById(planId);
    const customer = await Customer.findById(customerId);
    console.log(plan, customer);
    if (!plan || !customer) throw new NotFoundError('Plano ou usuário não foram encontrados');

    // Define membership duration
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + plan.monthDuration);

    const membership = new Membership({ customerId, planId, startDate, endDate });

    try {
      await membership.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ membership });
  }

  async getUserMemberships(req: IReqAuth, res: Response): Promise<Response> {
    if (req.userRole !== 'Admin' && req.userId !== req.params.id) throw new UnauthorizedError('Acesso ao recurso não concedido');

    const memberships = await Membership.find({ customerId: req.params.id });

    return res.status(StatusCodes.OK).json({ memberships });
  }
}

export const membershipsCtrl = new MembershipCtrl();
