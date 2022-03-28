import { StatusCodes } from 'http-status-codes';
import { Admin } from '../../models';
import { BadRequestError, NotFoundError } from '../../errors';
import { TCrudController } from '../../types';
import { Request, Response } from 'express';

class AdminsController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    const admin = new Admin(req.body);

    try {
      await admin.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ admin });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const admins = await Admin.find({});
    return res.status(StatusCodes.OK).json({ admins });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const adminId = req.params.id;

    let admin;

    try {
      admin = await Admin.findById(adminId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!admin) throw new NotFoundError('Admin not found');

    return res.status(StatusCodes.OK).json({ admin });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const adminId = req.params.id;
    let admin;

    try {
      admin = await Admin.findByIdAndUpdate(adminId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!admin) throw new NotFoundError(`Admin with id ${adminId} was not found`);

    return res.status(StatusCodes.CREATED).json({ admin });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const adminId = req.params.id;
    let admin;

    try {
      admin = await Admin.findByIdAndDelete(adminId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!admin) throw new NotFoundError(`Admin with id ${adminId} was not found`);

    return res.status(StatusCodes.OK).json({ admin });
  }
}

export const adminsCtrl = new AdminsController();
