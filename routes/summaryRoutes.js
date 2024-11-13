const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to summarize content
router.post('/', authMiddleware, summaryController.summarizeContent);

module.exports = router;