import { Router, Request, Response, NextFunction } from 'express';
import PostController from '@controllers/PostController';

const router = Router();

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const posts = await PostController.getAll();

    return response.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const postToCreate = request.body;
    const newPost = await PostController.create(postToCreate);

    return response.json(newPost);
  } catch (error) {
    next(error);
  }
});

router.get('/:postId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const postId = parseInt(request.params.postId);

    if (isNaN(postId)) {
      const error: any = new Error('Post id must be a number')
      error.statusCode = 400;
      throw error;
    }

    const post = await PostController.getOne(postId);
  
    return response.json(post);
  } catch (error) {
    next(error);
  }
})

export default router;
