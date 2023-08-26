const express = require('express');
const router = express.Router();
const {
  getGenre,
  setGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genreController');

router.get('/', getGenre);
router.post('/', setGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
