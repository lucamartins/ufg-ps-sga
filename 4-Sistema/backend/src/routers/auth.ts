//
// /v1/auth
//

import { Router } from 'express';
import { requireAuth } from '../middlewares';
import { authorizationController } from '../controllers';

const authRouter = Router();

authRouter.route('/').get(authorizationController.verifyState);
authRouter.route('/login').post(authorizationController.login);
authRouter.route('/logout').delete(authorizationController.logout);

export { authRouter };
