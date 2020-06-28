import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;

mongoose
  .connect(
    `mongodb+srv://${config.database.user}:${config.database.pass}@${config.database.host}/${config.database.name}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then((db) => console.log('DB Connected'))
  .catch((err) => console.log(err));
