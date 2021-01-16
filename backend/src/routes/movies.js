const router = require('express').Router();
const MovieModel = require('../models/movie');


//Get all the movies
router.get('/', async (req, res) => {
    try {
        let movies = await MovieModel.find();

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


//Add a new movie
router.post('/add', async (req, res) =>{
    const movie = req.body;

    const newMovie = new MovieModel(movie);

    try {
        await newMovie.save();

        res.status(201).json(newMovie);


    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});


//Modified an existing note
router.put('/edit/:id', async (req, res) =>{
    const movieId = req.params.id;

    const {title, description, postedDate, movieReleaseDate, cast, genre, languages} = req.body;

    try {
        let Movie = await MovieModel.findByIdAndUpdate(movieId, {title, description, postedDate, movieReleaseDate, cast, genre, languages});



        res.status(201).json(Movie);


    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});


//Delete a movie
router.delete('/delete/:id', async (req, res) =>{
    const movieId = req.params.id;

    try {
        await MovieModel.findByIdAndDelete(movieId);


        res.status(201);


    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});


module.exports = router;

