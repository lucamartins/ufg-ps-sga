//
// /v1/modalities
//

import { Router } from 'express';
import { modalitiesController } from '../controllers';
import { requireAuth, requireAdmin } from '../middlewares';

const modalitiesRouter = Router();

modalitiesRouter.route('/').all(requireAuth, requireAdmin).get(modalitiesController.getAll).post(modalitiesController.create);
modalitiesRouter.route('/:id').all(requireAuth, requireAdmin).get(modalitiesController.getOne).patch(modalitiesController.updateOne).delete(modalitiesController.deleteOne);

export { modalitiesRouter };
