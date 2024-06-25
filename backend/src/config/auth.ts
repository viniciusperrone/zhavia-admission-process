import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret: `${process.env.CONFIG_TOKEN}`,
    expiresIn: '1d',
  },
};
