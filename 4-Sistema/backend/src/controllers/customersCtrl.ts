import { StatusCodes } from 'http-status-codes';
import { Customer } from '../models';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { Request, Response } from 'express';
import { TCrudController, IReqAuth } from '../types';
import { emailService } from '../services';
import { isReqEmptyBody } from '../utils';
import bcrypt from 'bcrypt';

class CustomersController implements TCrudController {
  async create(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição com nome, email e senha deve ser fornecido');

    const exists = await Customer.findOne({ email: req.body.email });
    if (exists) throw new BadRequestError('Já existe uma conta cadastrada com esse endereço de email');

    req.body.password = await bcrypt.hash(req.body.password, 12);
    const customer = new Customer(req.body);

    try {
      await customer.save();
      await emailService.sendEmail(customer.email, {
        subject: 'TESTE - Confirme sua conta',
        text: `Olá, ${customer.name}, bem vindo ao SGA!\nClique no seguinte link para confirmar sua nova conta: link_teste_falso`,
      });
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

  async updateOne(req: IReqAuth, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição vazio');
    const customerId = req.params.id;

    // define type of requester (admin or owner)
    let requester;
    (() => {
      if (req.userRole === 'Admin') requester = 'admin';
      else if (req.userId === customerId) requester = 'owner';
      console.log(requester);
    })();

    if (!requester) throw new UnauthorizedError('Acesso a recurso não é permitido para o solicitante');

    const { name, email, curPassword, changePassword, newPassword } = req.body;
    const newUserData = changePassword ? { name, email, password: newPassword } : { name, email };
    if (changePassword) newUserData.password = await bcrypt.hash(newUserData.password, 12);

    const customer = await Customer.findById(customerId);
    if (!customer) throw new NotFoundError(`Cliente com id ${customerId} não foi encontrado`);

    // If the requester is the owner, password confirmation is mandatory
    if (requester === 'owner') {
      const isPasswordCorrect = await bcrypt.compare(curPassword, customer.password);
      if (!isPasswordCorrect) throw new UnauthorizedError('Senha atual incorreta');
    }

    let newCustomerDocument;

    try {
      newCustomerDocument = await Customer.findByIdAndUpdate(customerId, newUserData, { new: true, runValidators: true });
    } catch (err) {
      throw new BadRequestError('Não foi possível alterar dados');
    }

    return res.status(StatusCodes.CREATED).json({ customer: newCustomerDocument });
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
