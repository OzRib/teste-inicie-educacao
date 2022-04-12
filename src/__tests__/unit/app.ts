import { Request, Response } from 'express';
import createApp from '@app';
import next from 'next';
import routes from '@routes';
import * as bodyParser from 'body-parser';
import request from 'supertest';

const bodyParserJsonMock = jest.fn((request: Request, response: Response, next: Function) => {
  next();
});

const nextRequestHandlerMock = jest.fn((request: Request, response: Response) => {
  response.status(201).send('ok');
});
const nextGetRequestHandlerMock = jest.fn(() => nextRequestHandlerMock);
const nextPrepareMock = jest.fn();

jest.mock('@env', () => ({
  script: 'test',
  hostname: 'test',
  port: 80
}));

jest.mock('body-parser', () => ({
  json: jest.fn(() => bodyParserJsonMock)
}));

jest.mock('next', () => (
  jest.fn(() => ({
    getRequestHandler: nextGetRequestHandlerMock,
    prepare: nextPrepareMock
  }))
));

jest.mock('@routes', () => jest.fn((request: Request, response: Response) => {
  response.status(200).send('ok');
}));

describe('app module test', () => {
  it('create app', async () => {
    await createApp();
    expect(next).toHaveBeenCalledWith({
      dev: false,
      hostname: 'test',
      port: 80
    });
    expect(nextGetRequestHandlerMock).toHaveBeenCalled();
    expect(nextPrepareMock).toHaveBeenCalled();
    expect(bodyParser.json).toHaveBeenCalled();
  });

  it('test routes module connection', async () => {
    const app = await createApp();
    const { statusCode } = await request(app).get('/api');
    expect(statusCode).toEqual(200);
    expect(bodyParserJsonMock).toHaveBeenCalled();
    expect(routes).toHaveBeenCalled();
  });

  it('test next routes connection', async () => {
    const app = await createApp();
    const { statusCode } = await request(app).get('/');
    expect(statusCode).toEqual(201);
  });
});
