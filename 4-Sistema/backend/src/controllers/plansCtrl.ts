import { StatusCodes } from 'http-status-codes';
import { Plan } from '../models';
import { BadRequestError, NotFoundError } from '../errors';
import { isReqEmptyBody } from '../utils';
import { Request, Response } from 'express';
import { TCrudController } from '../types';

class PlansController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição não pode ser vazio');

    let plan = new Plan(req.body);

    try {
      plan = await plan.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ plan });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    let plans;

    if (req.userRole !== 'Admin') {
      plans = await Plan.find({ active: true }, { customers: 0, active: 0 });
    } else {
      plans = await Plan.find({});
    }

    return res.status(StatusCodes.OK).json({ plans });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const planId = req.params.id;
    let plan;

    try {
      plan = await Plan.findById(planId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!plan) throw new NotFoundError('plan not found');

    return res.status(StatusCodes.OK).json({ plan });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const planId = req.params.id;
    let plan;

    try {
      plan = await Plan.findByIdAndUpdate(planId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!plan) throw new NotFoundError(`plan with id ${planId} was not found`);

    return res.status(StatusCodes.CREATED).json({ plan });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const planId = req.params.id;
    let plan;

    try {
      plan = await Plan.findByIdAndDelete(planId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!plan) throw new NotFoundError(`plan with id ${planId} was not found`);

    return res.status(StatusCodes.OK).json({ plan });
  }
}

export const plansCtrl = new PlansController();
