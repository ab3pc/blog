import { config } from 'dotenv';

config();

const {
  SECRET_KEY,
  DATABASE_URL,
} = process.env;

const ENV = {
  DB: {
    CONNECTION_STRING: DATABASE_URL, 
  },
  JWT: {
    SECRET: SECRET_KEY,
    EXPIRES_IN: '30d',
    ALG: 'HS256',
  }
}

export { ENV };