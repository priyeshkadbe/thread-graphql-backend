import * as dotenv from 'dotenv';
dotenv.config();

export const serverConfig = {
  PORT: process.env.PORT,
  SALT:process.env.SALT,
  JWT_KEY:process.env.JWT_KEY
};
