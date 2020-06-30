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

  async listPages(pageData: number) {
    // let result = TravelModel.collection.count();
    // return result;
    // console.log('joven');
    let perPage = 10;
    let page = pageData;
    return new Promise((resolve, reject) => {
      // TravelModel.find({})
      //   .skip(perPage * page - perPage)
      //   .limit(perPage)
      //   .exec((err, travels) => {
      //     TravelModel.count((err: any, count: number) => {
      //       if (err) {
      //         return err;
      //       }
      //       return {
      //         current: page,
      //         pages: Math.ceil(count / perPage),
      //         travels,
      //       };
      //     });
      //   });
      var perPage = 10,
        page = Math.max(0, pageData);

      TravelModel.find()
        // .select('name')
        .limit(perPage)
        .skip(perPage * page)
        .sort({
          name: 'asc',
        })
        .exec(function (err, travels) {
          TravelModel.count((err: any, count: number) => {
            resolve({
              travels: travels,
              page: page,
              pages: Math.floor(count / perPage),
            });
          });
        });
    });
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

  async count() {
    let result = TravelModel.collection.count();
    return result;
  }

  async countCities() {
    let result = TravelModel.aggregate([
      {
        $group: {
          _id: {
            name: '$country.name',
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return result;
  }
}

const store = new MongoDB();
export default store;
