const MovieModel = require('../models/movie');

const movies = {
    //Get all the movies
    getMovies: async () => {
        return await MovieModel.find();
    },

    //Add a new movie
    addMovie: async (movie) => {
        const newMovie = new MovieModel(movie);
        await newMovie.save();
        return newMovie;
    },

    //Update a movie
    updateMovie: async (movieId, movie) => {
        return await MovieModel.findByIdAndUpdate(movieId, movie);
    },

    //Delete a movie
    deleteMovie: async (movieId) => {
        return await MovieModel.findByIdAndDelete(movieId);
    }
}
module.exports = movies;



