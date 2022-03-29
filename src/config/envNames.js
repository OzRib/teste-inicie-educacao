import 'dotenv/config';

const env = process.env;

const envNames = {
  port: env.PORT || 3000,
  hostname: env.HOSTNAME || 'localhost',
  script: env.npm_lifecycle_event
}

export default envNames;
