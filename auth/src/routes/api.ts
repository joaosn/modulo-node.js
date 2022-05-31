import { Router } from 'express';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.post('/register', ApiController.register);
//rourouter.post('/login', ApiController.login);

router.get('/list', ApiController.list);

export default router;