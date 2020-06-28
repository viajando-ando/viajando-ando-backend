import dotenv from 'dotenv';

dotenv.config();
export default {
  database: {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
  },
};

// export const database
