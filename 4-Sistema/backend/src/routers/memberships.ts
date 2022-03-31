//
// /v1/memberships
//

import { Router } from 'express';
import { membershipsCtrl } from '../controllers';
import { authRoute, requireOwnership } from '../middlewares';

const membershipsRouter = Router();

membershipsRouter.route('/').all(authRoute, requireOwnership).post(membershipsCtrl.create);
// membershipsRouter.route('/:id').all(authRoute).get(membershipsCtrl.getOne).patch(membershipsCtrl.updateOne).delete(membershipsCtrl.deleteOne);
membershipsRouter.route('/user/:id').all(authRoute, requireOwnership).get(membershipsCtrl.getUserMemberships);

export { membershipsRouter };
