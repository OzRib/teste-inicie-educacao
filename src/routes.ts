import { Router } from 'express';
import UserRoutes from '@controllers/UserController/routes';
import PostRoutes from '@controllers/PostController/routes';
import CommentRoutes from '@controllers/CommentController/routes';

const rootRouter = Router();

rootRouter.use('/users', UserRoutes);
rootRouter.use('/posts', PostRoutes);
rootRouter.use('/comments', CommentRoutes);

export default rootRouter;
