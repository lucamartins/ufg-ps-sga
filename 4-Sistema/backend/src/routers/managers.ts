//
// /v1/managers
//

import { Router } from 'express';
import { managersController } from '../controllers';

const managersRouter = Router();

managersRouter.route('/').get(managersController.getAll).post(managersController.create);
managersRouter.route('/:id').get(managersController.getOne).patch(managersController.updateOne).delete(managersController.deleteOne);

export { managersRouter };
