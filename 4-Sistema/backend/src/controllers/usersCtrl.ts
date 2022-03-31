import { StatusCodes } from 'http-status-codes';
import { User } from '../models';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors';
import { TCrudController } from '../types';
import { Request, Response } from 'express';
import { isReqEmptyBody } from '../utils';
import bcrypt from 'bcrypt';

class UsersCtrl {
  // async create(req: Request, res: Response): Promise<Response> {
  //   const admin = new Admin(req.body);

  //   try {
  //     await admin.save();
  //   } catch (err) {
  //     throw new BadRequestError((err as Error).message);
  //   }

  //   return res.status(StatusCodes.CREATED).json({ admin });
  // }

  async getAll(req: Request, res: Response): Promise<Response> {
    const users = await User.find({});
    return res.status(StatusCodes.OK).json({ users });
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const userId = req.params.id;

    let user;

    try {
      user = await User.findById(userId);
    } catch (err) {
      throw new BadRequestError('Incorrect ID data format passed in the request params');
    }

    if (!user) throw new NotFoundError('User not found');

    return res.status(StatusCodes.OK).json({ user });
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    if (isReqEmptyBody(req.body)) throw new BadRequestError('Corpo da requisição vazio');
    const userId = req.params.id;

    // define type of requester (admin or owner)
    let requester;
    (() => {
      if (req.userRole === 'Admin') requester = 'admin';
      else if (req.userId === userId) requester = 'owner';
      console.log(requester);
    })();

    if (!requester) throw new UnauthorizedError('Acesso a recurso não é permitido para o solicitante');

    const { name, email, curPassword, changePassword, newPassword } = req.body;
    const newUserData = changePassword ? { name, email, password: newPassword } : { name, email };
    if (changePassword) newUserData.password = await bcrypt.hash(newUserData.password, 12);

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError(`Usuario com id ${userId} não foi encontrado`);

    // If the requester is the owner, password confirmation is mandatory
    if (requester === 'owner') {
      const isPasswordCorrect = await bcrypt.compare(curPassword, user.password);
      if (!isPasswordCorrect) throw new UnauthorizedError('Senha atual incorreta');
    }

    let newUserDocument;

    try {
      newUserDocument = await User.findByIdAndUpdate(userId, newUserData, { new: true, runValidators: true });
    } catch (err) {
      throw new BadRequestError('Não foi possível alterar dados');
    }

    return res.status(StatusCodes.CREATED).json({ user: newUserDocument });
  }

  // async deleteOne(req: Request, res: Response): Promise<Response> {
  //   const adminId = req.params.id;
  //   let admin;

  //   try {
  //     admin = await Admin.findByIdAndDelete(adminId);
  //   } catch (err) {
  //     throw new BadRequestError('Incorrect ID data format passed in the request params');
  //   }

  //   if (!admin) throw new NotFoundError(`Admin with id ${adminId} was not found`);

  //   return res.status(StatusCodes.OK).json({ admin });
  // }
}

export const usersCtrl = new UsersCtrl();
