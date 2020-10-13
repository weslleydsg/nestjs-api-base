import { Secret, SignOptions } from 'jsonwebtoken';

if (!process.env.APP_SECRET)
  throw new Error('Insert APP_SECRET in environment file'); // TODO: add error for when APP_SECRET is not present

interface AuthConfig {
  secret: Secret;
  options: SignOptions;
}

const authConfig: AuthConfig = {
  secret: process.env.APP_SECRET,
  options: {
    expiresIn: '7d',
  },
};

export default authConfig;
