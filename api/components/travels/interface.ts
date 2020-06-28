import mongoose from 'mongoose';

export interface Travel extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  start: {
    date: {
      $date: string;
    };
    pickup_address: string;
    pickup_location: {
      type: string;
      coordinates: number[];
    };
  };
  end: {
    date: string;
    pickup_address: string;
    pickup_location: {
      type: string;
      coordinates: number[];
    };
  };
  country: {
    name: string;
  };
  city: {
    name: string;
  };
  passenger: {
    first_name: string;
    last_name: string;
  };
  driver: {
    first_name: string;
    last_name: string;
  };
  car: {
    plate: string;
  };
  status: string;
  check_code: string;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  price: number;
  driver_location: {
    type: string;
    coordinates: number[];
  };
}
