import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'fallback_access_secret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_secret'
};