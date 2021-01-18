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
  expect(result.length).toBe(0);
});

test('TC2 - Test getting from a database with 4 movies', async () => {
  const movieObject = {
    title: "titulo de pelicula",
    description: "descripcion de pelicula",
    movieReleaseDate: new Date("2001-02-20"),
    cast: ["Actor Principal", "Actor Secundario"],
    genre: ["Primer genero","Segundo genero"],
    languages: ["primer idioma","segundo idioma"]
  };
  ;
  for (let index = 0; index < 4; index++) {
    const newMovie = new MovieModel(movieObject);
    await newMovie.save()
  }
  const result = await movies.getMovies()
  expect(result.length).toBe(4);

  const obj = JSON.parse(JSON.stringify(result[0].toObject()));
  for (let i = 0; i < result.length; i++){
    const obj = result[i].toObject();
    for (let key of Object.keys(movieObject)) {
      expect(JSON.stringify(obj[key])).toBe(JSON.stringify(movieObject[key]));
    }
  }
});

// test('prueba', () => {
//   expect(0).toBe(0);
// });