//
// /v1/classgroups
//

import { Router } from 'express';
import { classGroupsCtrl } from '../controllers';
import { authRoute, requireAdmin } from '../middlewares';

const classGroupsRouter = Router();

classGroupsRouter.route('/').all(authRoute).get(classGroupsCtrl.getAll).post(requireAdmin, classGroupsCtrl.create);
classGroupsRouter.route('/:id').all(authRoute).get(classGroupsCtrl.getOne).patch(classGroupsCtrl.updateOne).delete(classGroupsCtrl.deleteOne);

export { classGroupsRouter };
