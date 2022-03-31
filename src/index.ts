import envNames from '@env';
import { createServer } from 'http';
import createApp from '@app';

createApp()
  .then(app => {
    const server = createServer(app)
    server.listen(envNames.port);

    console.log(`[server] Listening on port ${envNames.port}`)
  }).catch(error => {
    console.error('[error]', error);
    process.exit(1)
  });
