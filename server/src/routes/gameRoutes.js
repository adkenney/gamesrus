const express = require('express');
const router = express.Router();
const {
  getGames,
  setGame,
  updateGame,
  deleteGame,
} = require('../controllers/gameController');

router.get('/', getGames);
router.post('/', setGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

module.exports = router;
