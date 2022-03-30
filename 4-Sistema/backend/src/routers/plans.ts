import { Router } from 'express';
import { plansCtrl } from '../controllers';
import { requireAuth, requireAdmin } from '../middlewares';

const plansRouter = Router();

plansRouter.route('/').all(requireAuth).get(plansCtrl.getAll).post(requireAdmin, plansCtrl.create);
plansRouter.route('/:id').all(requireAuth).get(requireAdmin, plansCtrl.getOne).patch(plansCtrl.updateOne).delete(requireAdmin, plansCtrl.deleteOne);

export { plansRouter };
