import { Router } from 'express';
import { plansCtrl } from '../controllers';
import { authRoute, requireAdmin } from '../middlewares';

const plansRouter = Router();

plansRouter.route('/').all(authRoute).get(plansCtrl.getAll).post(requireAdmin, plansCtrl.create);
plansRouter.route('/:id').all(authRoute, requireAdmin).get(plansCtrl.getOne).patch(plansCtrl.updateOne).delete(plansCtrl.deleteOne);

export { plansRouter };
