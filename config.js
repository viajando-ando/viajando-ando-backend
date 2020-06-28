require('dotenv').config();

module.exports = {
  database: {
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
  },
};
