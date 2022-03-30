//
// /v1/customers
//

import { Router } from 'express';
import { customersController } from '../controllers';
import { requireAdmin, requireAuth, requireAccess } from '../middlewares';

const customersRouter = Router();

customersRouter.route('/').post(customersController.create);

customersRouter.route('/').get(requireAuth, customersController.getAll);
customersRouter.route('/:id').all(requireAuth).get(customersController.getOne).patch(customersController.updateOne).delete(customersController.deleteOne);

export { customersRouter };
