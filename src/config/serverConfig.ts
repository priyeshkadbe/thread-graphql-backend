import * as dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
  PORT: process.env.PORT,
  RANDOM_BYTES: process.env.RANDOM_BYTES,
};
