import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { TAuthController, TUserJwtPayload } from '../types';
import { User } from '../models';
import { AuthError, BadRequestError, UnauthenticatedError } from '../errors';
import bcrypt from 'bcrypt';

class AuthorizationController implements TAuthController {
  async login(req: Request, res: Response): Promise<Response> {
    // Get body data and process it
    const { email: userEmail, password: userPassword } = req.body;
    if (!userEmail || !userPassword) throw new BadRequestError('Email e senha de acesso devem ser fornecidos.');

    // If the data was supplied
    const user = await User.findOne({ email: userEmail });
    if (!user) throw new AuthError('Credenciais de acesso inválidas ou conta não existente.');

    const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordCorrect) throw new AuthError('Credenciais de acesso inválidas ou conta não existente.');

    const token = jwt.sign({ userId: user._id, userRole: user.__t }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(StatusCodes.CREATED)
      .json({ userId: user._id, userRole: user.__t });
  }

  async logout(req: Request, res: Response): Promise<Response> {
    return res.clearCookie('access_token').status(StatusCodes.OK).json({ message: 'Usuário deslogado com sucesso' });
  }

  async verifyState(req: Request, res: Response): Promise<Response> {
    const token = req.cookies.access_token;

    if (!token) throw new UnauthenticatedError('É necessário realizar login');

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET!);
      const { userId, userRole } = data as TUserJwtPayload;
      return res.status(StatusCodes.OK).json({ userId, userRole });
    } catch (err) {
      console.error(err);
      throw new UnauthenticatedError('É necessário realizar login');
    }
  }
}

export const authorizationController = new AuthorizationController();
