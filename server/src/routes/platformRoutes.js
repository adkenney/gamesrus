const express = require('express');
const router = express.Router();
const {
  getPlatform,
  setPlatform,
  updatePlatform,
  deletePlatform,
} = require('../controllers/platformController');

router.get('/', getPlatform);
router.post('/', setPlatform);
router.put('/:id', updatePlatform);
router.delete('/:id', deletePlatform);

module.exports = router;
