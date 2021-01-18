const movies = require('./movies')
const mongoose = require('mongoose');
const MovieModel = require('../models/movie');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();


const connect = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
}


const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
  }
}

//inicio de pruebas

beforeAll(async () => await connect());
afterAll(async () => await closeDatabase());



test('TC1 - Test getting from an empty database', async () => {
  const result = await movies.getMovies();
  expect(0).toBe(result.length);
});

// test('Test getting from an empty database', async () => {
//   const result = await movies.getMovies();

//   expect(0).toBe(result.length);
// });

// test('prueba', () => {
//   expect(0).toBe(0);
// });