import { createServer } from 'http';
import createApp from '@app';
import initializeServer from '@src/index';

jest.mock('@env', () => ({
  port: 80,
  script: 'test'
}));

jest.mock('@app', () => jest.fn(async () => ({
    server: "fake_server"
  }))
);

let listenMockCallCount = 0;

const listenMock = jest.fn(() => {
  listenMockCallCount++;
  console.log(listenMockCallCount);
  if (listenMockCallCount === 2)
    throw new Error('test error');
});

jest.mock('http', () => ({
  createServer: jest.fn(() => ({
    listen: listenMock
  }))
}));

describe('initializeServer test', () => {
  it('initialize server', async () => {
    await initializeServer();
    expect(createApp).toHaveBeenCalled();
    expect(createServer).toHaveBeenCalledWith({
      server: "fake_server"
    });
    expect(createServer().listen).toHaveBeenCalledWith(80);
  });
})
