//
// /v1/modalities
//

import { Router } from 'express';
import { modalitiesController } from '../controllers';
import { authRoute, requireAdmin } from '../middlewares';

const modalitiesRouter = Router();

modalitiesRouter.route('/').all(authRoute).get(modalitiesController.getAll).post(requireAdmin, modalitiesController.create);
modalitiesRouter.route('/:id').all(authRoute, requireAdmin).get(modalitiesController.getOne).patch(modalitiesController.updateOne).delete(modalitiesController.deleteOne);

export { modalitiesRouter };
