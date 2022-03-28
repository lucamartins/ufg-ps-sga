import { JwtPayload } from 'jsonwebtoken';

export type TUserJwtPayload = JwtPayload & {
  userId: string;
  userRole: string;
};
