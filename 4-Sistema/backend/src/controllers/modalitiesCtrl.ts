import { StatusCodes } from 'http-status-codes';
import { Modality } from '../models';
import { BadRequestError, NotFoundError } from '../errors';
import { isReqEmptyBody } from '../utils';
import { Request, Response } from 'express';
import { TCrudController } from '../types';

class ModalitiesController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Invalid request body');
    const modality = new Modality(req.body);

    try {
      await modality.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ modality });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const modalities = await Modality.find({});
    return res.status(StatusCodes.OK).json({ modalities });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const modalityId = req.params.id;
    let modality;

    try {
      modality = await Modality.findById(modalityId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!modality) throw new NotFoundError('modality not found');

    return res.status(StatusCodes.OK).json({ modality });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const modalityId = req.params.id;
    let modality;

    try {
      modality = await Modality.findByIdAndUpdate(modalityId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!modality) throw new NotFoundError(`modality with id ${modalityId} was not found`);

    return res.status(StatusCodes.CREATED).json({ modality });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const modalityId = req.params.id;
    let modality;

    try {
      modality = await Modality.findByIdAndDelete(modalityId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!modality) throw new NotFoundError(`modality with id ${modalityId} was not found`);

    return res.status(StatusCodes.OK).json({ modality });
  }
}

export const modalitiesController = new ModalitiesController();
