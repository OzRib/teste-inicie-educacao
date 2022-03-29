import envNames from '#env';
import { createServer } from 'http';
import createApp from '#app';

const app = await createApp();
const server = createServer(app);

server.listen(envNames.port, error => {
  if (error) {
    console.error(error);
    process.exit(1);
  } else {
    console.log(`[server] Listening on port ${envNames.port}`);
  }
});
