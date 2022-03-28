import { StatusCodes } from 'http-status-codes';
import { Manager } from '../../models';
import { BadRequestError, NotFoundError } from '../../errors';
import { TCrudController } from '../../types';
import { Request, Response } from 'express';

class ManagersController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    const manager = new Manager(req.body);

    try {
      await manager.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ manager });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const managers = await Manager.find({});
    return res.status(StatusCodes.OK).json({ managers });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const managerId = req.params.id;

    let manager;

    try {
      manager = await Manager.findById(managerId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!manager) throw new NotFoundError('Manager not found');

    return res.status(StatusCodes.OK).json({ manager });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const managerId = req.params.id;
    let manager;

    try {
      manager = await Manager.findByIdAndUpdate(managerId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!manager) throw new NotFoundError(`Manager with id ${managerId} was not found`);

    return res.status(StatusCodes.CREATED).json({ manager });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const managerId = req.params.id;
    let manager;

    try {
      manager = await Manager.findByIdAndDelete(managerId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!manager) throw new NotFoundError(`Manager with id ${managerId} was not found`);

    return res.status(StatusCodes.OK).json({ manager });
  }
}

export const managersController = new ManagersController();
