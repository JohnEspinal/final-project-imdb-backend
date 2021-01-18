const router = require('express').Router();
const movies = require('./movies')


//Get all the movies
router.get('/', async (req, res) => {
  console.log('get called');
    try {
        res.status(200).json(await movies.getMovies());
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


//Add a new movie
router.post('/add', async (req, res) =>{
    const movie = req.body;

    try {

        res.status(201).json(await movies.addMovie(movie));

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});


//Modified an existing note
router.put('/edit/:id', async (req, res) =>{
    const movieId = req.params.id;

    const {title, description, postedDate, movieReleaseDate, cast, genre, languages} = req.body;
    const movie = {title, description, postedDate, movieReleaseDate, cast, genre, languages};
    try {
        res.status(201).json(await movies.updateMovie(movieId, movie));


    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});


//Delete a movie
router.delete('/delete/:id', async (req, res) =>{
    const movieId = req.params.id;

    try {
        await movies.deleteMovie(movieId);

        res.status(201);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
});

module.exports = router;

