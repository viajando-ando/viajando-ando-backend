import TravelInterface from './travelInterface';
import { ObjectId } from 'mongodb';

const COLLECTION: String = 'travels';
class Controller {
  store: any;
  travel!: TravelInterface;

  constructor(injectedStore: any) {
    this.store = injectedStore;
  }

  async list() {
    const travels = await this.store.list(COLLECTION);
    return travels;
  }

  async count() {
    const countTravels = await this.store.count();
    return countTravels;
  }

  async countCities() {
    const countTravels = await this.store.countCities();
    return countTravels;
  }

  async upsert(body: any, isBulk: boolean) {
    let date = new Date().toISOString();
    let newObj;
    let isNew = false;

    if (!isBulk && !body._id) {
      this.travel = {
        start: {
          date: {
            date: date,
          },
          pickup_address: body.start.pickup_address,
          pickup_location: {
            tr_type: body.start.pickup_location.type,
            coordinates: [
              body.start.pickup_location.lat,
              body.start.pickup_location.long,
            ],
          },
        },
        end: {
          date: '',
          pickup_address: body.end.pickup_address,
          pickup_location: {
            tr_type: body.end.pickup_location.type,
            coordinates: [
              body.end.pickup_location.lat,
              body.end.pickup_location.long,
            ],
          },
        },
        country: {
          name: body.country,
        },
        city: {
          name: body.city,
        },
        passenger: {
          first_name: body.passenger.first_name,
          last_name: body.passenger.last_name,
        },
        driver: {
          first_name: body.driver.first_name,
          last_name: body.driver.last_name,
        },
        car: {
          plate: body.car.plate,
        },
        status: body.status,
        check_code: body.code,
        createdAt: {
          date: date,
        },
        updatedAt: {
          date: date,
        },
        price: body.price,
        driver_location: {
          tr_type: body.driver_location.type,
          coordinates: [body.driver_location.lat, body.driver_location.long],
        },
      };
    } else {
      this.travel = body;
    }

    if (body._id) {
      this.travel.updatedAt.date = date;
      newObj = this.travel;
    } else {
      isNew = true;
      newObj = { _id: new ObjectId(), ...this.travel };
    }
    return this.store.upsert(COLLECTION, newObj, isNew);
  }
}

export default Controller;
