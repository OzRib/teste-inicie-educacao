import express from 'express';
import request from 'supertest';
import CommentRoutes from '@controllers/CommentController/routes';
import CommentController from '@controllers/CommentController';
import * as bodyParser from 'body-parser';

jest.mock('@controllers/CommentController', () => ({
  getOne: jest.fn(async (commentId: number) => {
    if (commentId === 1)
      return {
        id: 1,
        post_id: 1,
        name: 'foo',
        email: 'foo@bar.com',
        body: 'bar'
      }
  }),
  create: jest.fn(async (comment: any) => ({
    id: 1,
    ...comment
  })),
  delete: jest.fn(async () => { })
}));

describe('CommentController routes unit test', () => {
  const app = express();
  app.use(bodyParser.json());
  app.use('/comments', CommentRoutes);

  it('get one comment', async () => {
    const { body: comment, statusCode } = await request(app).get('/comments/1');

    expect(comment).toMatchObject({
      id: 1,
      post_id: 1,
      name: 'foo',
      email: 'foo@bar.com',
      body: 'bar'
    });
    expect(statusCode).toEqual(200);
    expect(CommentController.getOne).toHaveBeenCalledWith(1);
  });

  it('create comment', async () => {
    const comment = {
      post_id: 1,
      name: 'foo',
      email: 'foo@bar.com',
      body: 'bar'
    };
    const { body: newComment, statusCode } = await request(app).post('/comments').send(comment);
    
    expect(newComment).toMatchObject({
      id: 1,
      ...comment
    });
    expect(statusCode).toEqual(200);
    expect(CommentController.create).toHaveBeenCalledWith(comment);
  });

  it('delete comment',  async () => {
    const { statusCode } = await request(app).delete('/comments/1');
    expect(statusCode).toEqual(200);
    expect(CommentController.delete).toHaveBeenCalledWith(1);
  });
});
