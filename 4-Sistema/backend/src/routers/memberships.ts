//
// /v1/memberships
//

import { Router } from 'express';
import { membershipsCtrl } from '../controllers';
import { requireAuth, requireOwnership } from '../middlewares';

const membershipsRouter = Router();

membershipsRouter.route('/').all(requireAuth).post(membershipsCtrl.create);
// membershipsRouter.route('/:id').all(requireAuth).get(membershipsCtrl.getOne).patch(membershipsCtrl.updateOne).delete(membershipsCtrl.deleteOne);
membershipsRouter.route('/user/:id').all(requireAuth, requireOwnership).get(membershipsCtrl.getUserMemberships);

export { membershipsRouter };
