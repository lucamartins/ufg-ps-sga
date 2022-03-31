//
// /v1/admins
//

import { Router } from 'express';
import { adminsCtrl } from '../controllers';
import { authRoute, requireAdmin } from '../middlewares';

const adminsRouter = Router();

adminsRouter.route('/').all(authRoute, requireAdmin).get(adminsCtrl.getAll).post(adminsCtrl.create);
adminsRouter.route('/:id').all(authRoute, requireAdmin).get(adminsCtrl.getOne).patch(adminsCtrl.updateOne).delete(adminsCtrl.deleteOne);

export { adminsRouter };
