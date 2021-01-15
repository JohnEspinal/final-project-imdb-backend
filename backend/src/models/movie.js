const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    description: String,
    postedDate: {
        type: Date,
        default: new Date()
    },
    movieReleaseDate: Date,
    cast: [String],
    genre: [String],
    languages: [String]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;