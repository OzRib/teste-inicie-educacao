import express from 'express';
import next from 'next';
import envNames from '@env';
import routes from '@routes';
import * as bodyParser from 'body-parser';

export default async function createApp() {
  const { hostname, port, script } = envNames;
  const dev = script === 'dev';

  console.log('[app] initializing next app...');
  const nextApp = next({ dev, hostname, port });
  const nextRequestHandler = nextApp.getRequestHandler();
  await nextApp.prepare();
  console.log('[app] next app initialized');

  console.log('[app] initializing express app...');
  const app = express();
  app.use(bodyParser.json());
  app.use('/api', routes);

  app.all('*', (request, response) => {
    return nextRequestHandler(request, response);
  });
  console.log('[app] express app initialized');

  return app;
};
