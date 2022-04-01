import express, { Router, Request, Response } from 'express';
import routes from '@routes';
import request from 'supertest';

function createRouterMock() {
  const router = Router();

  router.get('/', (request: Request, response: Response) => response.status(200).send('ok'));

  return router;
}

jest.mock('@controllers/UserController/routes', createRouterMock);
jest.mock('@controllers/PostController/routes', createRouterMock);
jest.mock('@controllers/CommentController/routes', createRouterMock);

describe('root router unit test', () => {
  const app = express();
  app.use(routes);

  it('call UserController route', async () => {
    const { statusCode } = await request(app).get('/users');

    expect(statusCode).toEqual(200);
  });

  it('call PostController route', async () => {
    const { statusCode } = await request(app).get('/posts');

    expect(statusCode).toEqual(200);
  });

  it('call CommentController route', async () => {
    const { statusCode } = await request(app).get('/comments');

    expect(statusCode).toEqual(200);
  });
});
