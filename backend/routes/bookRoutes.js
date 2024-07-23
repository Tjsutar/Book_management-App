const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/book-types', bookController.getBookTypes);
router.get('/genres', bookController.getGenres);

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.put('/books/:id', bookController.updateBook);
router.put('/books/:id/deactivate', bookController.deactivateBook);

module.exports = router;
