import { StatusCodes } from 'http-status-codes';
import { ClassGroup } from '../models';
import { BadRequestError, NotFoundError } from '../errors';
import { isReqEmptyBody } from '../utils';
import { Request, Response } from 'express';
import { TCrudController } from '../types';

class ClassGroupesController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição é requerido');
    const classGroup = new ClassGroup(req.body);

    try {
      await classGroup.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ classGroup });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const classGroups = await ClassGroup.find({});
    return res.status(StatusCodes.OK).json({ classGroups });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const classGroupId = req.params.id;
    let classGroup;

    try {
      classGroup = await ClassGroup.findById(classGroupId);
    } catch (err) {
      throw new BadRequestError('ID informado não possui formatação correta');
    }

    if (!classGroup) throw new NotFoundError('Turma não encontrada');

    return res.status(StatusCodes.OK).json({ classGroup });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const classGroupId = req.params.id;
    let classGroup;

    try {
      classGroup = await ClassGroup.findByIdAndUpdate(classGroupId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('ID informado não possui formatação correta');
    }

    if (!classGroup) throw new NotFoundError(`Não há turma com o ID: ${classGroupId}`);

    return res.status(StatusCodes.CREATED).json({ classGroup });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const classGroupId = req.params.id;
    let classGroup;

    try {
      classGroup = await ClassGroup.findByIdAndDelete(classGroupId);
    } catch (err) {
      throw new BadRequestError('ID informado não possui formatação correta');
    }

    if (!classGroup) throw new NotFoundError(`Não há turma com o ID: ${classGroupId}`);

    return res.status(StatusCodes.OK).json({ classGroup });
  }
}

export const classGroupesController = new ClassGroupesController();
