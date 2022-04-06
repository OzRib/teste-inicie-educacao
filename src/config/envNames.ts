import 'dotenv/config';

const env = process.env;

const envNames = {
  port: parseInt(env.PORT || '80'),
  hostname: env.HOSTNAME || 'localhost',
  script: env.npm_lifecycle_event,
  goRestAuthorizationToken: env.GO_REST_AUTHORIZATION_TOKEN || null
}

export default envNames;
