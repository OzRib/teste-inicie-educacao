import { Router, Request, Response, NextFunction } from 'express';
import CommentController from '@controllers/CommentController';

const router = Router();

router.get('/:commentId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const commentId = parseInt(request.params.commentId);

    if (isNaN(commentId)) {
      const error: any = new Error('Comment id must be a number');
      error.statusCode = 400;
      throw error;
    }

    const comment = await CommentController.getOne(commentId);

    return response.json(comment);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const commentToCreate = request.body;
    const newComment = await CommentController.create(commentToCreate);

    return response.json(newComment);
  } catch (error) {
    next(error);
  }
});

router.delete('/:commentId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const commentId = parseInt(request.params.commentId);

    if (isNaN(commentId)) {
      const error: any = new Error('Comment id must be a number');
      error.statusCode = 400;
      throw error;
    }

    await CommentController.delete(commentId);

    return response.json({ deleted: true });
  } catch (error) {
    next(error);
  }
});

export default router;
