const dotenv = process.env.NODE_ENV === 'production' ? null : require('dotenv');

if (dotenv)
  dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  });
