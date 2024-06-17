import mongoose from 'mongoose';

export async function connect() {
  // console.log(process.env.NEXT_PUBLIC_MONGO_URL);
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected');
    });
    connection.on('error', (err) => {
      console.log(
        'Mongodb connection error,please make sure db is up and running',
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong in connecting to db');
    console.log(error);
  }
}
