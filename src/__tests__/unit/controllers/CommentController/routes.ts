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
  getAll: jest.fn(async () => ([])),
  getAllByPost: jest.fn(async () => ([])),
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

  it('get one comment with non number id', async () => {
    const { statusCode } = await request(app).get('/comments/foo');

    expect(statusCode).toEqual(400);
    expect(CommentController.getOne).not.toHaveBeenCalled();
  });

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

  it('get all comments', async () => {
    const { body: comments, statusCode } = await request(app).get('/comments');

    expect(comments).toBeInstanceOf(Array);
    expect(statusCode).toEqual(200);
    expect(CommentController.getAll).toHaveBeenCalled();
  });

  it('get all comments by post', async () => {
    const { body: comments, statusCode } = await request(app).get(`/comments?postId=1`);

    expect(comments).toBeInstanceOf(Array);
    expect(statusCode).toEqual(200);
    expect(CommentController.getAllByPost).toHaveBeenCalledWith(1);
  });

  it('delete comment with non number id', async () => {
    const { statusCode } = await request(app).delete('/comments/foo');

    expect(statusCode).toEqual(400);
    expect(CommentController.delete).not.toHaveBeenCalled();
  });

  it('delete comment', async () => {
    const { statusCode } = await request(app).delete('/comments/1');

    expect(statusCode).toEqual(200);
    expect(CommentController.delete).toHaveBeenCalledWith(1);
  });
});
