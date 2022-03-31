//
// /v1/customers
//

import { Router } from 'express';
import { customersController } from '../controllers';
import { requireAdmin, authRoute, requireOwnership } from '../middlewares';

const customersRouter = Router();

customersRouter.route('/').post(customersController.create);
customersRouter.route('/').get(authRoute, requireAdmin, customersController.getAll);
customersRouter
  .route('/:id')
  .all(authRoute)
  .get(requireOwnership, customersController.getOne)
  .patch(requireOwnership, customersController.updateOne)
  .delete(requireAdmin, customersController.deleteOne);

export { customersRouter };
