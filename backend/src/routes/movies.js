const router = require('express').Router();
const MovieModel = require('../models/movie');



router.get('/', async (req, res) => {
    try {
        const movies = await MovieModel.find();

        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

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


module.exports = router;

