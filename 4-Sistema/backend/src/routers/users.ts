//
// /v1/admins
//

import { Router } from 'express';
import { usersCtrl } from '../controllers';
import { authRoute, requireOwnership } from '../middlewares';

const usersRouter = Router();

usersRouter.route('/').all(authRoute, requireOwnership).get(usersCtrl.getAll);
usersRouter.route('/:id').all(authRoute, requireOwnership).patch(usersCtrl.updateOne).get(usersCtrl.getOne);

export { usersRouter };
