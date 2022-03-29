import { Router } from 'express';
import { plansCtrl } from '../controllers';
import { requireAuth, requireAdmin } from '../middlewares';

const plansRouter = Router();

plansRouter.route('/').all(requireAuth, requireAdmin).get(plansCtrl.getAll).post(plansCtrl.create);
plansRouter.route('/:id').all(requireAuth, requireAdmin).get(plansCtrl.getOne).patch(plansCtrl.updateOne).delete(plansCtrl.deleteOne);

export { plansRouter };
