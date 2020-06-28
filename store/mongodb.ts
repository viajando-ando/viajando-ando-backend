import mongoose from 'mongoose';
import config from '../config';
import TravelModel from '../api/components/travels/model';

class MongoDB {
  constructor() {
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
      .catch((err) => console.error(err));
  }

  async list(table: String) {
    if (table === 'travels') {
      const travels = TravelModel.find();
      return travels;
    }
    return null;
  }
}

const store = new MongoDB();
export default store;
