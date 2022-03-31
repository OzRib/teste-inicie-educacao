import { Router } from 'express';
import UserRoutes from '@controllers/UserController/routes';

const rootRouter = Router();

rootRouter.use('/users', UserRoutes);

export default rootRouter;
