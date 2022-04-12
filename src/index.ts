import envNames from '@env';
import { createServer } from 'http';
import createApp from '@app';

const testScript = envNames.script === 'test';

export default async function initializeServer() {
  try {
    const app = await createApp();
    const server = createServer(app);
    server.listen(envNames.port);

    console.log(`[server] Listening on port ${envNames.port}`);
  } catch (error) {
    console.error('[error]', error);
    if (testScript !== true)
      process.exit(1);
  }
}

if (testScript !== true)
  initializeServer();
