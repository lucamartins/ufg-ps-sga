//
// /v1/admins
//

import { Router } from 'express';
import { adminsCtrl } from '../controllers';

const adminsRouter = Router();

adminsRouter.route('/').get(adminsCtrl.getAll).post(adminsCtrl.create);
adminsRouter.route('/:id').get(adminsCtrl.getOne).patch(adminsCtrl.updateOne).delete(adminsCtrl.deleteOne);

export { adminsRouter };
