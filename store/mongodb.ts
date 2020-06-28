import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb+srv://${user}:${password}@${host}/${database_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB Connected'))
  .catch((err) => console.log(err));
