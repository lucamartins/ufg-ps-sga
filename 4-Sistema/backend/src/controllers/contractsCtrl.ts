import { StatusCodes } from 'http-status-codes';
import { Contract } from '../models';
import { BadRequestError, NotFoundError } from '../errors';
import { isReqEmptyBody } from '../utils';
import { Request, Response } from 'express';
import { TCrudController } from '../types';

class ContractsController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição é requerido');
    const contract = new Contract(req.body);

    try {
      await contract.save();
    } catch (err) {
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ contract });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const contracts = await Contract.find({});
    return res.status(StatusCodes.OK).json({ contracts });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const contractId = req.params.id;
    let contract;

    try {
      contract = await Contract.findById(contractId);
    } catch (err) {
      throw new BadRequestError('ID informado não possui formatação correta');
    }

    if (!contract) throw new NotFoundError('Turma não encontrada');

    return res.status(StatusCodes.OK).json({ contract });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const contractId = req.params.id;
    let contract;

    try {
      contract = await Contract.findByIdAndUpdate(contractId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('ID informado não possui formatação correta');
    }

    if (!contract) throw new NotFoundError(`Não há turma com o ID: ${contractId}`);

    return res.status(StatusCodes.CREATED).json({ contract });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const contractId = req.params.id;
    let contract;

    try {
      contract = await Contract.findByIdAndDelete(contractId);
    } catch (err) {
      throw new BadRequestError('ID informado não possui formatação correta');
    }

    if (!contract) throw new NotFoundError(`Não há turma com o ID: ${contractId}`);

    return res.status(StatusCodes.OK).json({ contract });
  }
}

export const contractsController = new ContractsController();
