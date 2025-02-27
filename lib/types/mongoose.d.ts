import { MongoClient } from 'mongodb';

declare global {
  var _mongoose: {
    connection: any | null;
    promise: Promise<Mongoose> | null;
  };
}
