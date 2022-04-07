import express from 'express';
import request from 'supertest';
import PostRoutes from '@controllers/PostController/routes';
import * as bodyParser from 'body-parser';
import PostController from '@controllers/PostController';

jest.mock('@controllers/PostController', () => ({
  create: jest.fn(async (post: any) => ({
    id: 1,
    user_id: 1,
    ...post
  })),
  getOne: jest.fn(async (id: number) => {
    if (id === 1)
      return {
        id: 1,
        user_id: 1,
        title: 'foo',
        body: 'bar'
      };
  }),
  getAll: jest.fn(async  () => ([]))
}));

describe('PostController routes test', () => {
  const app = express();
  app.use(bodyParser.json());
  app.use('/posts', PostRoutes);

  it('get all posts', async () => {
    const { body: posts } = await request(app).get('/posts');
    
    expect(posts).toBeInstanceOf(Array);
    expect(PostController.getAll).toHaveBeenCalled();
  });

  it('get one post with non number id', async () => {
    const { statusCode } = await request(app).get('/posts/foo');

    expect(statusCode).toEqual(400);
    expect(PostController.getOne).not.toHaveBeenCalled();
  });

  it('get one post', async () => {
    const { body: post } = await request(app).get('/posts/1');

    expect(post).toMatchObject({
      id: 1,
      user_id: 1,
      title: 'foo',
      body: 'bar'
    });
    expect(PostController.getOne).toHaveBeenCalledWith(1);
  });

  it('create post', async () => {
    const post = {
      title: 'foo',
      body: 'bar'
    };
    const { body: newPost } = await request(app).post('/posts').send(post);

    expect(newPost).toMatchObject({
      id: 1,
      user_id: 1,
      ...post
    });
    expect(PostController.create).toHaveBeenCalledWith(post);
  });
});
