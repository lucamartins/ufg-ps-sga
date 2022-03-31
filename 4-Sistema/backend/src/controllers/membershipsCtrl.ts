import { StatusCodes } from 'http-status-codes';
import { Membership, Plan, Customer } from '../models';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { isReqEmptyBody } from '../utils';
import { Request, Response } from 'express';
import { TCrudController } from '../types';

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

  async getUserMemberships(req: Request, res: Response): Promise<Response> {
    // if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição não pode ser vazio');

    if (req.userRole !== 'Admin' && req.userId !== req.params.id) throw new UnauthorizedError('Acesso ao recurso não concedido');

    const memberships = await Membership.find({ customerId: req.params.id });
    console.log(memberships);

    return res.status(StatusCodes.OK).json({ memberships });
  }

  // async getAll(req: Request, res: Response): Promise<Response> {
  //   let plans;

  //   if (req.userRole !== 'Admin') {
  //     plans = await Plan.find({ active: true }, { customers: 0, active: 0 });
  //   } else {
  //     plans = await Plan.find({});
  //   }

  //   return res.status(StatusCodes.OK).json({ plans });
  // }

  // async getOne(req: Request, res: Response): Promise<Response> {
  //   const planId = req.params.id;
  //   let plan;

  //   try {
  //     plan = await Plan.findById(planId);
  //   } catch (err) {
  //     throw new BadRequestError('Incorrect ID data format passed in the request params');
  //   }

  //   if (!plan) throw new NotFoundError('plan not found');

  //   return res.status(StatusCodes.OK).json({ plan });
  // }

  // async updateOne(req: Request, res: Response): Promise<Response> {
  //   const planId = req.params.id;
  //   let plan;

  //   try {
  //     plan = await Plan.findByIdAndUpdate(planId, req.body, {
  //       new: true,
  //       runValidators: true,
  //     });
  //   } catch (err) {
  //     throw new BadRequestError('Incorrect ID data format passed in the request params');
  //   }

  //   if (!plan) throw new NotFoundError(`plan with id ${planId} was not found`);

  //   return res.status(StatusCodes.CREATED).json({ plan });
  // }
}

export const membershipsCtrl = new MembershipCtrl();
