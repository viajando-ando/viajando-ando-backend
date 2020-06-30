import mongoose from 'mongoose';
import config from '../config';
import TravelModel from '../api/components/travels/model';
import TravelInterface from '../api/components/travels/travelInterface';
import mongodb from 'mongodb';

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
      .then((db) => console.info('DB Connected'))
      .catch((err) => console.error(err));
  }

  async list(table: String) {
    if (table === 'travels') {
      const travels = TravelModel.find();
      return travels;
    }
    return null;
  }

  async upsert(collection: String, travel: TravelInterface, isNew: boolean) {
    if (collection === 'travels') {
      if (isNew) {
        const travelResponse = new TravelModel(travel);
        return travelResponse.save();
      }

      const travelElement = TravelModel.findOne({ _id: travel._id });

      if (travelElement) {
        travelElement.update(travel, (err) => {
          if (err) {
            console.error(err);
            return err;
          } else {
            return true;
          }
        });
      } else {
        return 'Item not found';
      }
    }
  }
}

const store = new MongoDB();
export default store;
