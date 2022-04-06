import { Router, Request, Response, NextFunction } from 'express';
import UserController from '@controllers/UserController';

const router = Router();

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const email = request.query.email;

    if (email instanceof Array) {
      const error: any = new Error('Email must be a string');
      error.statusCode = 400;
      throw error;
    }

    if (typeof email === 'string') {
      const users = await UserController.getAllByEmail(email);

      return response.json(users);
    }

    const users = await UserController.getAll();

    return response.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userToCreate = request.body;
    const newUser = await UserController.create(userToCreate);

    return response.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = parseInt(request.params.userId);

    if (isNaN(userId)) {
      const error: any = new Error('User id must be a number');
      error.statusCode = 400;
      throw error;
    }

    const user = await UserController.getOne(userId);

    return response.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = parseInt(request.params.userId);

    if (isNaN(userId)) {
      const error: any = new Error('User id must be a number');
      error.statusCode = 400;
      throw error;
    }

    await UserController.delete(userId);

    return response.send('deleted');
  } catch (error) {
    next(error);
  }
});

export default router;
