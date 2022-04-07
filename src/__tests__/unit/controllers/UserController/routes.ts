import express from 'express';
import request from 'supertest';
import UserRoutes from '@controllers/UserController/routes';
import UserController from '@controllers/UserController';
import * as bodyParser from 'body-parser';

jest.mock('@controllers/UserController', () => ({
  create: jest.fn(async (user: any) => ({
    id: 1,
    ...user
  })),
  getAll: jest.fn(async () => ([])),
  getOne: jest.fn(async (userId: number) => {
    if (userId === 1)
      return {
        id: 1,
        email: 'foo@bar.com',
        gender: 'male',
        name: 'foo bar',
        status: 'active'
      }
    const error: any = new Error('not found');
    error.statusCode = 404;
    throw error;
  }),
  getAllByEmail: jest.fn(async () => ([])),
  delete: jest.fn(async () => { })
}))

describe('UserController routes test', () => {
  const app = express();
  app.use(bodyParser.json());
  app.use('/users', UserRoutes);

  it('get all users', async () => {
    const { body: users, statusCode } = await request(app).get('/users');

    expect(users).toBeInstanceOf(Array);
    expect(statusCode).toEqual(200);
    expect(UserController.getAll).toHaveBeenCalled();
  });

  it('get all users by email', async () => {
    const email = 'foo@bar.com';
    const encodedEmail = encodeURIComponent(email);

    const { body: users, statusCode } = await request(app).get(`/users?email=${encodedEmail}`);

    expect(users).toBeInstanceOf(Array);
    expect(statusCode).toEqual(200);
    expect(UserController.getAllByEmail).toHaveBeenCalledWith(email);
  });

  it('get one user with non number id', async () => {
    const { statusCode } = await request(app).get('/users/foo');

    expect(statusCode).toEqual(400);
    expect(UserController.getOne).not.toHaveBeenCalled();
  });

  it('get one user', async () => {
    const { body: user, statusCode } = await request(app).get('/users/1');

    expect(user).toMatchObject({
      id: 1,
      email: 'foo@bar.com',
      name: 'foo bar',
      gender: 'male',
      status: 'active'
    });
    expect(statusCode).toEqual(200);
    expect(UserController.getOne).toHaveBeenCalledWith(1);
  });

  it('create user', async () => {
    const user = {
      email: 'foo@bar.com',
      name: 'foo bar',
      gender: 'male',
      status: 'active'
    };
    const { body: newUser, statusCode } = await request(app).post('/users').send(user);

    expect(newUser).toMatchObject({
      id: 1,
      ...user
    });
    expect(statusCode).toEqual(200);
    expect(UserController.create).toHaveBeenCalledWith(user);
  });

  it('delete user with non number id', async () => {
    const { statusCode } = await request(app).get('/users/foo');

    expect(statusCode).toEqual(400);
    expect(UserController.delete).not.toHaveBeenCalled();
  });

  it('delete user', async () => {
    await request(app).delete('/users/1');

    expect(UserController.delete).toHaveBeenCalled();
  });
});
