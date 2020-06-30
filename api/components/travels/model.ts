import mongoose, { Schema, model } from 'mongoose';
import Travel from './interface';

const TravelSchema: Schema = new Schema({
  start: {
    date: {
      date: String,
    },
    pickup_address: String,
    pickup_location: {
      tr_type: String,
      coordinates: [Number],
    },
  },
  end: {
    date: String,
    pickup_address: String,
    pickup_location: {
      tr_type: String,
      coordinates: [Number],
    },
  },
  country: {
    name: String,
  },
  city: {
    name: String,
  },
  passenger: {
    first_name: String,
    last_name: String,
  },
  driver: {
    first_name: String,
    last_name: String,
  },
  car: {
    plate: String,
  },
  status: String,
  check_code: String,
  createdAt: {
    date: String,
  },
  updatedAt: {
    date: String,
  },
  price: Number,
  driver_location: {
    tr_type: String,
    coordinates: [Number],
  },
});

export default model<Travel>('Travel', TravelSchema);
