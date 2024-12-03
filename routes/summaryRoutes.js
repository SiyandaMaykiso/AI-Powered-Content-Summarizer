const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUploadMiddleware'); // Import file upload middleware

// Route to summarize text input
router.post('/', authMiddleware, summaryController.summarizeContent);

// Route to summarize content from uploaded files
router.post('/upload', authMiddleware, upload.single('file'), summaryController.summarizeFile);

module.exports = router;