const express = require('express');
const router = express.Router();
const { getGames, setGames } = require('../controllers/gameController');

router.get('/', getGames);
router.post('/', setGames);
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update game ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete game ${req.params.id}` });
});

module.exports = router;
