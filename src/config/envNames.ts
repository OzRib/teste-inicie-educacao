import 'dotenv/config';

const env = process.env;

const envNames = {
  port: parseInt(env.PORT || '80'),
  hostname: env.HOSTNAME || 'localhost',
  script: env.npm_lifecycle_event,
  authorizationToken: env.AUTHORIZATION_TOKEN || null
}

export default envNames;
