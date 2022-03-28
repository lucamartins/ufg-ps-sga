import { StatusCodes } from 'http-status-codes';
import { Customer } from '../../models';
import { BadRequestError, NotFoundError } from '../../errors';
import { Request, Response } from 'express';
import { TCrudController } from '../../types';
// import { emailService } from '../../services';
import { isReqEmptyBody } from '../../utils';
import bcrypt from 'bcrypt';

class CustomersController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição com nome, email e senha deve ser fornecido');

    req.body.password = await bcrypt.hash(req.body.password, 12);

    const customer = new Customer(req.body);

    try {
      await customer.save();
      // await emailService.sendEmail(customer.email, {
      //   subject: 'Confirme sua conta',
      //   text: `Olá, ${customer.name}, bem vindo a Mergulho Sports!\nClique no seguinte link para confirmar sua nova conta: https://www.mergulhosports.com`,
      // });
    } catch (err) {
      console.log((err as Error).message);
      throw new BadRequestError((err as Error).message);
    }

    return res.status(StatusCodes.CREATED).json({ customer });
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const customers = await Customer.find({});
    return res.status(StatusCodes.OK).json({ customers });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const customerId = req.params.id;

    let customer;

    try {
      customer = await Customer.findById(customerId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!customer) throw new NotFoundError('Customer not found');

    return res.status(StatusCodes.OK).json({ customer });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    const customerId = req.params.id;
    let customer;

    if (req.body.password) {
      req.body.password = await bcrypt.hash('Effeludoucao132@', 12);
    }

    try {
      customer = await Customer.findByIdAndUpdate(customerId, req.body, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!customer) throw new NotFoundError(`Customer with id ${customerId} was not found`);

    return res.status(StatusCodes.CREATED).json({ customer });
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    const customerId = req.params.id;
    let customer;

    try {
      customer = await Customer.findByIdAndDelete(customerId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!customer) throw new NotFoundError(`Customer with id ${customerId} was not found`);

    return res.status(StatusCodes.OK).json({ customer });
  }
}

export const customersController = new CustomersController();
