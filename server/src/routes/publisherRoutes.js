const express = require('express');
const router = express.Router();

const {
  getPublisher,
  setPublisher,
  updatePublisher,
  deletePublisher,
} = require('../controllers/publisherController');

router.get('/', getPublisher);
router.post('/', setPublisher);
router.put('/:id', updatePublisher);
router.delete('/:id', deletePublisher);

module.exports = router;
